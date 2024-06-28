"use client";
import { Suspense, useEffect, useState } from "react";
import Calendar from "./components/calendar";
import styles from "./page.module.css";
import { EventType } from "./types/types";
import List from "./components/list";
import Loading from "./components/loader";

export default function Home() {
  const [day, setDay] = useState<number>(0);
  const [events, setEvents] = useState<Array<EventType>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://event-api.chebarash.uz/event");
      if (response.status == 200) setEvents(await response.json());
      setLoading(false);
    })();
  }, []);

  if (loading || !events) return <Loading />;

  return (
    <main className={styles.main}>
      <Suspense>
        <Calendar day={day} setDay={setDay} />
        <List day={day} events={events} />
      </Suspense>
    </main>
  );
}
