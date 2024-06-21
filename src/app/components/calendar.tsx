"use client";
import { Dispatch, SetStateAction, useEffect, useState, JSX } from "react";
import styles from "./calendar.module.css";
import { useSearchParams } from "next/navigation";

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

  useEffect(() => {
    const date = new Date();
    setMonth(date.toLocaleString(`en`, { month: `long` }));
    setList([]);
    for (let i = 0; i < 10; i++) {
      let thisDay = new Date(date);
      thisDay.setDate(date.getDate() + i);
      setList((list) => [
        ...list,
        <li
          key={i}
          className={[
            [6, 0].includes(thisDay.getDay()) ? styles.weekend : styles.li,
            i == day ? styles.active : ``,
          ].join(` `)}
        >
          <button className={styles.button} onClick={() => setDay(i)}>
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
  }, [day]);

  return (
    <section
      className={[styles.section, !params ? `` : styles.nothome].join(` `)}
    >
      <p className={styles.title}>{month}</p>
      <ul className={styles.list}>{list}</ul>
    </section>
  );
}
