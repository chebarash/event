"use client";
import { Dispatch, SetStateAction, useEffect, useState, JSX } from "react";
import styles from "./calendar.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import useEvents from "../hooks/useEvents";

export default function Calendar({
  day,
  setDay,
}: {
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
}) {
  const [month, setMonth] = useState<string>();
  const [list, setList] = useState<Array<JSX.Element>>([]);
  const params = useSearchParams().get(`_id`);
  const router = useRouter();
  const { events } = useEvents();

  useEffect(() => {
    const event = events.find(({ _id }) => _id == params);
    if (event) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      const thisDay = new Date(event.date);
      thisDay.setHours(0, 0, 0, 0);
      setDay(
        Math.round((thisDay.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      );
    } else router.push(`?`);
  }, [params, events]);

  useEffect(() => {
    const date = new Date();
    setMonth(date.toLocaleString(`en`, { month: `long` }));
    setList([]);
    for (let i = 0; i < 10; i++) {
      const thisDay = new Date(date);
      thisDay.setDate(date.getDate() + i);
      setList((list) => [
        ...list,
        <li
          key={i}
          className={
            [6, 0].includes(thisDay.getDay()) ? styles.weekend : styles.li
          }
        >
          <button
            className={[styles.button, i == day ? styles.active : ``].join(` `)}
            onClick={() => setDay(i)}
            disabled={
              !events.filter(
                ({ date }) => thisDay.toDateString() == date.toDateString()
              ).length
            }
          >
            <p className={styles.day}>
              {thisDay
                .toLocaleDateString(`en`, { weekday: `short` })
                .slice(0, 2)}
            </p>
            <p className={styles.date}>{thisDay.getDate()}</p>
          </button>
        </li>,
      ]);
    }
  }, [day, events]);

  return (
    <section
      className={[styles.section, !params ? `` : styles.nothome].join(` `)}
    >
      <p className={styles.title}>{month}</p>
      <ul className={styles.list}>{list}</ul>
    </section>
  );
}
