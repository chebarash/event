"use client";
import styles from "./event.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EventType } from "../types/types";

export default function Event({
  _id,
  title,
  picture,
  description,
  author,
  date,
  venue,
  duration,
}: EventType) {
  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();
  const params = useSearchParams().get(`_id`);
  const router = useRouter();

  const hours = duration / (1000 * 60 * 60);

  useEffect(() => {
    window.Telegram.WebApp.MainButton.setParams({
      text: `Join`,
      is_active: !!params,
      is_visible: !!params,
    });
  }, [params]);

  useEffect(() => {
    const d = new Date(date);
    setTime(
      d.toLocaleString(`en`, { timeStyle: `short`, timeZone: `Etc/UTC` })
    );
    setDay(
      d.toLocaleDateString(`en`, { month: `long`, timeZone: `Etc/UTC` }) +
        ` ` +
        d.getDate()
    );
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
        <p>{author.given_name}</p>
        <img src={picture} alt={title} />
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
          <div>
            {hours} {hours == 1 ? `hour` : `hours`}
          </div>
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
