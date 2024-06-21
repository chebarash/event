"use client";
import Link from "next/link";
import styles from "./event.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Event({
  _id,
  title,
  cover,
  author,
  date,
}: {
  _id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  date: number;
  venue: string;
}) {
  const [time, setTime] = useState<string>();
  const params = useSearchParams().get(`_id`);

  useEffect(() => {
    setTime(new Date(date).toLocaleString(`en`, { timeStyle: `short` }));
  }, []);

  return (
    <Link
      href={`?_id=${_id}`}
      className={[
        styles.event,
        params ? (params == _id ? styles.active : styles.inactive) : ``,
      ].join(` `)}
    >
      <span>
        <p>{author}</p>
        <img src={cover} alt={title} />
      </span>
      <div>
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
    </Link>
  );
}
