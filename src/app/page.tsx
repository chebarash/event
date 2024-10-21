"use client";
import { useEffect, useState } from "react";
import Calendar from "./components/calendar";
import styles from "./page.module.css";
import List from "./components/list";
import useEvents from "./hooks/useEvents";
import useUser from "./hooks/useUser";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [day, setDay] = useState<number>(0);
  const p = useSearchParams();
  const params = useSearchParams().get(`_id`);
  const { events, update, loading } = useEvents();
  const { user, loading: l } = useUser();

  useEffect(() => {
    const { themeParams, MainButton } = window.Telegram.WebApp;
    const fn = () => {
      const params = p.get(`_id`);
      if (!params) return;
      const event = events[params];
      if (!event) return;
      if (event.external)
        if (event.external.startsWith(`https://t.me/`))
          window.Telegram.WebApp.openTelegramLink(event.external);
        else window.Telegram.WebApp.openLink(event.external);
      else update(params);
    };
    if (params) {
      const event = events[params];
      if (event) {
        const timeGap = new Date().getTime() - event.date.getTime();
        const active = !!user && timeGap < 0;
        MainButton.setParams({
          is_active: active,
          is_visible: active,
          ...(events[params].participants?.includes(user?._id || ``)
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
    } else {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(fn);
    }
    return () => {
      MainButton.offClick(fn);
    };
  }, [params, events, user]);

  return (
    <main className={styles.main}>
      {(loading || l) && <div className={styles.loading}></div>}
      <Calendar day={day} setDay={setDay} />
      <List day={day} />
    </main>
  );
}
