"use client";
import { useEffect, useState } from "react";
import Calendar from "./components/calendar";
import styles from "./page.module.css";
import List from "./components/list";
import useEvents from "../hooks/useEvents";
import useUser from "../hooks/useUser";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [day, setDay] = useState<number>(0);
  const p = useSearchParams();
  const params = useSearchParams().get(`_id`);
  const { events, update, loading, isRegistered } = useEvents();
  const { user, loading: l } = useUser();

  useEffect(() => {
    const { themeParams, MainButton, SecondaryButton } = window.Telegram.WebApp;
    window.Telegram.WebApp.disableVerticalSwipes();
    window.Telegram.WebApp.expand();
    const fn = () => {
      const params = p.get(`_id`);
      if (!params) return;
      const event = events[params];
      if (!event) return;
      if (event.external) {
        if (!isRegistered(event, user?._id)) update(params);
        if (event.external.startsWith(`https://t.me/`))
          window.Telegram.WebApp.openTelegramLink(event.external);
        else window.Telegram.WebApp.openLink(event.external);
      } else update(params);
    };
    const fnScnd = () => {
      const params = p.get(`_id`);
      if (!params) return;
      const event = events[params];
      if (!event) return;
      if (isRegistered(event, user?._id)) update(params);
    };
    if (params) {
      const event = events[params];
      if (event) {
        const timeGap = new Date().getTime() - event.date.getTime();
        const deadlineGap = event.deadline
          ? new Date().getTime() - event.deadline.getTime()
          : -1;
        const registered = isRegistered(event, user?._id);
        const active =
          !!user &&
          timeGap < 0 &&
          deadlineGap < 0 &&
          !event.cancelled &&
          (!event.spots ||
            registered ||
            event.spots - event.registered.length > 0);
        SecondaryButton.setParams({
          is_active: !!event.external && active && registered,
          is_visible: !!event.external && active && registered,
          text: `Unregister`,
          color: themeParams.section_bg_color,
          text_color: themeParams.text_color,
        });
        MainButton.setParams({
          is_active: active,
          is_visible: active,
          ...(registered && !event.external
            ? {
                text: `Unregister`,
                color: themeParams.section_bg_color,
                text_color: themeParams.text_color,
              }
            : {
                text: event.external ? `Register (Link)` : `Register`,
                color: themeParams.button_color,
                text_color: themeParams.button_text_color,
              }),
        });
      }
      MainButton.offClick(fn);
      MainButton.onClick(fn);
      SecondaryButton.offClick(fnScnd);
      SecondaryButton.onClick(fnScnd);
    } else {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      SecondaryButton.setParams({
        is_active: false,
        is_visible: false,
      });
      SecondaryButton.offClick(fnScnd);
      MainButton.offClick(fn);
    }
    return () => {
      SecondaryButton.offClick(fnScnd);
      MainButton.offClick(fn);
    };
  }, [params, events, user]);

  return (
    <main className={styles.main}>
      {(loading || l) && <div className={styles.loading}></div>}
      <Calendar day={day} setDay={setDay} />
      <List day={day} setDay={setDay} />
    </main>
  );
}
