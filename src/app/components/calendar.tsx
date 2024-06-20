"use client";
import { Dispatch, SetStateAction, useEffect, useState, JSX } from "react";
import styles from "./calendar.module.css";

export default function Calendar({
  day,
  setDay,
}: {
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
}) {
  const date = new Date();
  const [list, setList] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
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
    <section className={styles.section}>
      <p className={styles.title}>
        {date.toLocaleString(`en`, { month: `long` })}
      </p>
      <ul className={styles.list}>{list}</ul>
    </section>
  );
}
