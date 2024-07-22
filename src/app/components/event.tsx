"use client";
import styles from "./event.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EventType } from "../types/types";
import useUser from "../hooks/useUser";
import useAxios from "../hooks/useAxios";

export default function Event({
  _id,
  title,
  picture,
  description,
  authors,
  date,
  venue,
  duration,
}: EventType) {
  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();
  const params = useSearchParams().get(`_id`);
  const router = useRouter();
  const { user } = useUser();
  const { fetchData } = useAxios({
    url: `/registration?_id=${_id}`,
    method: `get`,
    manual: true,
  });

  const hours = duration / (1000 * 60 * 60);

  useEffect(() => {
    window.Telegram.WebApp.MainButton.setParams({
      text: `Join`,
      is_active: !!params && !!user,
      is_visible: !!params && !!user,
    });
    window.Telegram.WebApp.MainButton.onClick(fetchData);
  }, [params, user]);

  useEffect(() => {
    setTime(date.toLocaleString(`en`, { timeStyle: `short` }));
    setDay(
      date.toLocaleDateString(`en`, { month: `long` }) + ` ` + date.getDate()
    );
  }, []);

  return (
    <div
      id={_id}
      style={{ cursor: params != _id ? `pointer` : `default` }}
      onClick={params != _id ? () => router.push(`?_id=${_id}`) : undefined}
      className={[
        styles.event,
        params ? (params == _id ? styles.active : styles.inactive) : ``,
      ].join(` `)}
    >
      <span>
        <p>
          {authors[0].given_name
            .toLowerCase()
            .replace(/\b(\w)/g, (x) => x.toUpperCase())}
        </p>
        <img src={picture} alt={title} />
      </span>
      {params == _id ? (
        <div className={styles.full}>
          <div>
            <div className={styles.titleBox}>
              <h1>{title}</h1>
              <button
                className={styles.arrow}
                onClick={() =>
                  window.Telegram.WebApp.switchInlineQuery(title, [
                    `bots`,
                    `channels`,
                    `groups`,
                    `users`,
                  ])
                }
              >
                <svg width="14" height="14" viewBox="0 0 19 19" fill="none">
                  <path
                    d="M3 16L17 2M17 2V16M17 2H3"
                    stroke="var(--bg)"
                    strokeWidth="4"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>
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
      ) : (
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
      )}
    </div>
  );
}
