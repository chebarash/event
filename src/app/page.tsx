"use client";
import { Suspense, useState } from "react";
import Calendar from "./components/calendar";
import styles from "./page.module.css";
import { EventType } from "./types/types";
import List from "./components/list";
import Loading from "./components/loader";
import useAxios from "./hooks/useAxios";

export default function Home() {
  const [day, setDay] = useState<number>(0);

  const { data, error, loading } = useAxios<Array<EventType>>({
    url: `/event`,
    method: `get`,
  });

  if (loading) return <Loading />;
  if (error || !data)
    return (
      <div>
        Error: {error}
        <br />
        Reopen
      </div>
    );

  return (
    <main className={styles.main}>
      <Suspense>
        <Calendar day={day} setDay={setDay} events={data} />
        <List day={day} events={data} />
      </Suspense>
    </main>
  );
}
