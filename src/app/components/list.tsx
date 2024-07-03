"use client";
import styles from "./list.module.css";
import Event from "./event";
import { EventType } from "../types/types";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function List({
  day,
  events,
}: {
  day: number;
  events: Array<EventType>;
}) {
  const params = useSearchParams().get(`_id`);
  const router = useRouter();
  const [localDay, setLocalDay] = useState(0);
  const [direction, setDirection] = useState(``);
  const [list, setList] = useState<Array<EventType>>([]);

  useEffect(() => {
    if (params) window.Telegram.WebApp.BackButton.show();
    else window.Telegram.WebApp.BackButton.hide();
    window.Telegram.WebApp.BackButton.onClick(() => router.push(`?`));
  }, [params]);

  useEffect(() => {
    if (localDay == day) setDirection(``);
    else setDirection(localDay < day ? styles.toLeft : styles.toRight);
    setTimeout(() => setLocalDay(day), 250);
    setList(
      events.filter(
        ({ date }) =>
          new Date(Date.now() + 1000 * 60 * 60 * 24 * day).toLocaleDateString(
            `en`
          ) ==
          new Date(date).toLocaleDateString(`en`, {
            timeZone: `Etc/UTC`,
          })
      )
    );
  }, [day, localDay]);

  return (
    <div className={[styles.list, direction].join(` `)}>
      {list.map((event) => (
        <Event {...event} key={event._id} />
      ))}
    </div>
  );
}
