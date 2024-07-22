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
  registered,
}: EventType) {
  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();
  const params = useSearchParams().get(`_id`);
  const router = useRouter();
  const { user } = useUser();
  const { fetchData } = useAxios({
    url: `/registration?_id=${_id}&registered=${registered}`,
    method: `get`,
    manual: true,
  });

  const hours = duration / (1000 * 60 * 60);

  useEffect(() => {
    window.Telegram.WebApp.MainButton.setParams({
      text: registered ? `Unregister` : `Register`,
      is_active: !!params && !!user,
      is_visible: !!params && !!user,
    });
    window.Telegram.WebApp.MainButton.onClick(fetchData);
  }, [params, user, registered]);

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
      {registered && (
        <svg
          className={styles.registered}
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
        >
          <path
            d="M41.162 7.08965L40.0403 5.0664L38.2005 6.46879L34.0049 9.66681L34.6221 4.22542L34.8745 2H32.6348H19.3652H17.1255L17.3779 4.22543L17.9951 9.66681L13.7995 6.46879L11.9597 5.0664L10.838 7.08965L4.25084 18.9708L3.19873 20.8685L5.17569 21.7628L10.1212 24L5.17569 26.2372L3.19873 27.1315L4.25084 29.0292L10.838 40.9104L11.9597 42.9336L13.7995 41.5312L17.9951 38.3332L17.3779 43.7746L17.1255 46H19.3652H32.6348H34.8745L34.6221 43.7746L34.0049 38.3332L38.2005 41.5312L40.0403 42.9336L41.162 40.9104L47.7492 29.0292L48.8013 27.1315L46.8243 26.2372L41.8788 24L46.8243 21.7628L48.8013 20.8685L47.7492 18.9708L41.162 7.08965Z"
            fill="var(--accent)"
            stroke="var(--bg)"
            stroke-width="4"
          />
        </svg>
      )}
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
