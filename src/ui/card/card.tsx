"use client";

import { EventType } from "@/types/types";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  _id,
  title,
  picture,
  color,
  duration,
  date,
  private: prvt,
  cancelled,
  registration,
  includeDate,
}: EventType & {
  registration?: boolean;
  includeDate?: boolean;
}) {
  const time = date.toLocaleString(`en`, {
    timeStyle: `short`,
    dateStyle: includeDate ? `medium` : undefined,
  });
  const end = new Date(date.getTime() + duration).toLocaleString(`en`, {
    timeStyle: `short`,
  });

  return (
    <Link
      href={`/events/${_id}`}
      className={[
        styles.event,
        cancelled ? styles.cancelled : ``,
        prvt ? styles.private : ``,
      ].join(` `)}
      style={{ background: color }}
    >
      {registration && (
        <svg className={styles.star} width="60" viewBox="0 0 52 48" fill="none">
          <path
            d="M41.162 7.08965L40.0403 5.0664L38.2005 6.46879L34.0049 9.66681L34.6221 4.22542L34.8745 2H32.6348H19.3652H17.1255L17.3779 4.22543L17.9951 9.66681L13.7995 6.46879L11.9597 5.0664L10.838 7.08965L4.25084 18.9708L3.19873 20.8685L5.17569 21.7628L10.1212 24L5.17569 26.2372L3.19873 27.1315L4.25084 29.0292L10.838 40.9104L11.9597 42.9336L13.7995 41.5312L17.9951 38.3332L17.3779 43.7746L17.1255 46H19.3652H32.6348H34.8745L34.6221 43.7746L34.0049 38.3332L38.2005 41.5312L40.0403 42.9336L41.162 40.9104L47.7492 29.0292L48.8013 27.1315L46.8243 26.2372L41.8788 24L46.8243 21.7628L48.8013 20.8685L47.7492 18.9708L41.162 7.08965Z"
            fill="var(--accent)"
            stroke="var(--bg)"
            strokeWidth="4"
          />
        </svg>
      )}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.date}>
        {time} - {end}
      </p>
      <div className={styles.cover}>
        <div
          className={styles.gradient}
          style={{
            background: `linear-gradient(180deg,${color} 0%,${color}00 100%)`,
          }}
        ></div>
        <Image
          src={process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + picture}
          alt="cover"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
          className={styles.cover}
        />
      </div>
    </Link>
  );
}
