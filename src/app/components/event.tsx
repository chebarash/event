"use client";
import styles from "./event.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Event({
  _id,
  title,
  cover,
  description,
  author,
  date,
  venue,
}: {
  _id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  date: number;
  venue: string;
}) {
  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();
  const params = useSearchParams().get(`_id`);
  const router = useRouter();

  useEffect(() => {
    const d = new Date(date);
    setTime(d.toLocaleString(`en`, { timeStyle: `short` }));
    setDay(d.toLocaleDateString(`en`, { month: `long` }) + " " + d.getDate());
  }, []);

  return (
    <button
      id={_id}
      disabled={!!params}
      onClick={() => router.push(`?_id=${_id}`)}
      className={[
        styles.event,
        params ? (params == _id ? styles.active : styles.inactive) : ``,
      ].join(` `)}
    >
      <span>
        <p>{author}</p>
        <img src={cover} alt={title} />
      </span>
      <div className={styles.full}>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <section>
          <div>
            {day?.split(` `).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div>
            {time?.split(` `).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div>{venue}</div>
        </section>
      </div>
      <div className={styles.mini}>
        <div className={styles.box}>
          <p className={styles.title}>{title}</p>
          <p className={styles.date}>{time}</p>
        </div>
        <div className={styles.arrow}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M3 16L17 2M17 2V16M17 2H3"
              stroke="var(--bg)"
              strokeWidth="4"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
