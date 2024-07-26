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
  const { events, loading, error, update } = useEvents();
  const { user } = useUser();
  const [qr, setQr] = useState(``);

  useEffect(() => {
    const { offEvent, onEvent, closeScanQrPopup } = window.Telegram.WebApp;
    const fn = ({ data }: { data: string }) => {
      setQr(data);
      closeScanQrPopup();
    };
    onEvent(`qrTextReceived`, fn);
    return () => {
      offEvent(`qrTextReceived`, fn);
    };
  }, []);

  useEffect(() => {
    const { themeParams, MainButton } = window.Telegram.WebApp;
    const fn = () => {
      const params = p.get(`_id`);
      const event = events.find(({ _id }) => _id == params);
      if (event && event.registered) {
        const timeGap = new Date().getTime() - event.date.getTime();
        if (timeGap > 0)
          return window.Telegram.WebApp.showScanQrPopup({
            text: `Ask the organizers to provide a QR code`,
          });
      }
      if (params) update(params);
    };
    if (params) {
      const event = events.find(({ _id }) => _id == params);
      if (event && event.registered) {
        const timeGap = new Date().getTime() - event.date.getTime();
        MainButton.setParams({
          is_active: !!user && timeGap < event.duration,
          is_visible: !!user && timeGap < event.duration,
          ...(timeGap > 0
            ? {
                text: `Scan QR`,
                color: themeParams.button_color,
                text_color: themeParams.button_text_color,
              }
            : {
                text: `Unregister`,
                color: themeParams.section_bg_color,
                text_color: themeParams.text_color,
              }),
        });
      } else
        MainButton.setParams({
          is_active: !!user,
          is_visible: !!user,
          text: `Register`,
          color: themeParams.button_color,
          text_color: themeParams.button_text_color,
        });
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
      {qr}
      <Calendar day={day} setDay={setDay} />
      <List day={day} />
    </main>
  );
}
