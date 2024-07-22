"use client";
import { Suspense, useState } from "react";
import Calendar from "./components/calendar";
import styles from "./page.module.css";
import List from "./components/list";
import Loading from "./components/loader";
import useEvents from "./hooks/useEvents";

export default function Home() {
  const [day, setDay] = useState<number>(0);

  const { loading, error } = useEvents();

  if (loading) return <Loading />;
  if (error) return <></>;

  return (
    <main className={styles.main}>
      <Suspense>
        <Calendar day={day} setDay={setDay} />
        <List day={day} />
      </Suspense>
    </main>
  );
}
