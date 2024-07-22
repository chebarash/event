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

  useEffect(() => {
    const fn = () => {
      const params = p.get(`_id`);
      if (params) update(params);
    };
    if (params) {
      const event = events.find(({ _id }) => _id == params);
      window.Telegram.WebApp.MainButton.setParams({
        text: event && event.registered ? `Unregister` : `Register`,
        color:
          event && event.registered
            ? window.Telegram.WebApp.themeParams.section_bg_color
            : window.Telegram.WebApp.themeParams.button_color,
        is_active: !!user,
        is_visible: !!user,
      });
      window.Telegram.WebApp.MainButton.offClick(fn);
      window.Telegram.WebApp.MainButton.onClick(fn);
    } else {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      window.Telegram.WebApp.MainButton.offClick(fn);
    }
    return () => {
      window.Telegram.WebApp.MainButton.offClick(fn);
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
