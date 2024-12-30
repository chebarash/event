"use client";
import styles from "./event.module.css";
import { useEffect, useState } from "react";
import { EventType } from "../../types/types";
import Image from "next/image";
import useAxios from "../../hooks/useAxios";
import useToast from "../../hooks/useToast";
import ToJsx from "./jsx";
import useUser from "../../hooks/useUser";
import QRCode from "react-qr-code";

const getTimeRemaining = (endtime: Date) => {
  const total = endtime.getTime() - Date.now();
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const list: Array<[number, string]> = [
    [days, days > 1 ? `days` : `day`],
    [hours, hours > 1 ? `hours` : `hour`],
    [minutes > 0 ? minutes : 1, minutes > 1 ? `minutes` : `minute`],
  ];
  return list.filter(([t]) => t > 0)[0];
};

export default function Event({
  _id,
  title,
  picture,
  description,
  author,
  date,
  venue,
  duration,
  shares,
  registered,
  participated,
  hashtags,
  spots,
  deadline,
  external,
  private: prvt,
  cancelled,
  registration,
}: EventType & { registration?: boolean }) {
  const { user } = useUser();
  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();
  const { toast } = useToast();
  const { fetchData } = useAxios({
    url: `/registered?_id=${_id}`,
    method: `get`,
    manual: true,
  });

  const timeLeft = deadline ? getTimeRemaining(deadline) : undefined;
  const spotsLeft = spots ? spots - registered.length : undefined;
  const hours = duration / (1000 * 60 * 60);

  useEffect(() => {
    setTime(date.toLocaleString(`en`, { timeStyle: `short` }));
    setDay(
      date.toLocaleDateString(`en`, { month: `long` }) + ` ` + date.getDate()
    );
  }, [date]);

  return (
    <div
      id={_id}
      className={[
        styles.event,
        cancelled ? styles.cancelled : ``,
        prvt ? styles.private : ``,
      ].join(` `)}
    >
      {registration && (
        <svg
          className={styles.star}
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
        >
          <path
            d="M41.162 7.08965L40.0403 5.0664L38.2005 6.46879L34.0049 9.66681L34.6221 4.22542L34.8745 2H32.6348H19.3652H17.1255L17.3779 4.22543L17.9951 9.66681L13.7995 6.46879L11.9597 5.0664L10.838 7.08965L4.25084 18.9708L3.19873 20.8685L5.17569 21.7628L10.1212 24L5.17569 26.2372L3.19873 27.1315L4.25084 29.0292L10.838 40.9104L11.9597 42.9336L13.7995 41.5312L17.9951 38.3332L17.3779 43.7746L17.1255 46H19.3652H32.6348H34.8745L34.6221 43.7746L34.0049 38.3332L38.2005 41.5312L40.0403 42.9336L41.162 40.9104L47.7492 29.0292L48.8013 27.1315L46.8243 26.2372L41.8788 24L46.8243 21.7628L48.8013 20.8685L47.7492 18.9708L41.162 7.08965Z"
            fill="var(--accent)"
            stroke="var(--bg)"
            strokeWidth="4"
          />
        </svg>
      )}
      <span className={styles.cover}>
        <p>{author.name}</p>
        <Image
          src={process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + picture}
          alt="cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </span>
      <div className={styles.section}>
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
              <p>{shares}</p>
            </button>
          </div>
          <ToJsx>{description}</ToJsx>
        </div>
        <section>
          <div className={styles.day}>
            {day?.split(` `).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className={styles.time}>
            {time?.split(` `).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className={styles.venue}>{venue}</div>
          <div className={styles.duration}>
            <p>{hours}</p> <p>{hours == 1 ? `hour` : `hours`}</p>
          </div>
          {timeLeft && (
            <div className={styles.deadline}>
              <p>{timeLeft[0]}</p> <p>{timeLeft[1]} left</p>
            </div>
          )}
          {spotsLeft != undefined && (
            <div className={styles.spots}>
              <p>{spotsLeft > 1 ? spotsLeft : spotsLeft < 1 ? `NO` : `LAST`}</p>{" "}
              <p>{spotsLeft == 1 ? `spot` : `spots`} left</p>
            </div>
          )}
        </section>
        <p className={styles.calendar}>
          <b>*</b>
          {registration
            ? ` the event is already in your google calendar`
            : ` the event will be automatically added to your google calendar when you register`}
        </p>
        {_id &&
          (author._id == user?._id ||
            user?.clubs.some((c) => c._id == author._id)) && (
            <>
              <ul className={styles.registered}>
                {registered.map(({ name, picture, email, id }) => (
                  <li key={id}>
                    <Image
                      src={picture || `/profile.png`}
                      width={40}
                      height={40}
                      alt="profile"
                    />
                    <div>
                      <h3>{name}</h3>
                      <pre
                        onClick={() => {
                          toast(`Copied to clipboard`);
                          navigator.clipboard.writeText(`${id}`);
                        }}
                      >
                        {id}
                      </pre>
                      <p>{email}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className={styles.button} onClick={() => fetchData()}>
                {`Get registered - ${registered.length}`}
              </button>
              <QRCode value={_id} bgColor="var(--bg)" fgColor="var(--accent)" />
            </>
          )}
      </div>
    </div>
  );
}
