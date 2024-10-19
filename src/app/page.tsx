"use client";
import { useEffect, useState } from "react";
import Calendar from "./components/calendar";
import styles from "./page.module.css";
import List from "./components/list";
import Loading from "./components/loader";
import useEvents from "./hooks/useEvents";
import useUser from "./hooks/useUser";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [day, setDay] = useState<number>(0);
  const p = useSearchParams();
  const params = useSearchParams().get(`_id`);
  const { events, loading, error, update, participated } = useEvents();
  const { user } = useUser();

  useEffect(() => {
    const { offEvent, onEvent } = window.Telegram.WebApp;
    const fn = ({ data }: { data: string }) => {
      const params = p.get(`_id`);
      if (data == params) participated(data);
    };
    offEvent(`qrTextReceived`, fn);
    onEvent(`qrTextReceived`, fn);
    return () => {
      offEvent(`qrTextReceived`, fn);
    };
  }, [participated]);

  useEffect(() => {
    const { themeParams, MainButton } = window.Telegram.WebApp;
    const fn = () => {
      const params = p.get(`_id`);
      const event = events.find(({ _id }) => _id == params);
      if (event && event.registration) {
        const timeGap = new Date().getTime() - event.date.getTime();
        if (timeGap > 0)
          return window.Telegram.WebApp.showScanQrPopup({
            text: `Ask the organizers`,
          });
      }
      if (params)
        if (event?.external)
          if (event.external.startsWith(`https://t.me/`))
            window.Telegram.WebApp.openTelegramLink(event.external);
          else window.Telegram.WebApp.openLink(event.external);
        else update(params);
    };
    if (params) {
      const event = events.find(({ _id }) => _id == params);
      if (event) {
        const timeGap = new Date().getTime() - event.date.getTime();
        const active =
          !!user &&
          timeGap < event.duration &&
          (!!event.registration || timeGap < 0) &&
          !event.registration?.participated;
        MainButton.setParams({
          is_active: active,
          is_visible: active,
          ...(timeGap > 0
            ? {
                text: `Scan QR`,
                color: themeParams.button_color,
                text_color: themeParams.button_text_color,
              }
            : event.registration
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
  }, [params, events]);

  if (loading) return <Loading />;
  if (error) return <></>;

  return (
    <main className={styles.main}>
      <Calendar day={day} setDay={setDay} />
      <List day={day} />
    </main>
  );
}
