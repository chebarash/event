"use client";

import Link from "next/link";
import styles from "./foryou.module.css";

const data = {
  title: `Samarkand trip`,
  subtitle: `by Travel Club`,
  button: `Get Ticket`,
  image: `http://event-api.chebarash.uz/photo/AgACAgIAAxkBAAI_-GdztNRpEgO5GCL6lJ0UhYbnO8_2AAJl4TEb2MmgSzZvX5SXKTE-AQADAgADdwADNgQ`,
  link: `/events/6763c2141438c4cd016b4c60`,
};

export default function ForYou() {
  return (
    <section>
      <h2>For You</h2>
      <div
        className={styles.foryou}
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className={styles.content}>
          <div className={styles.text}>
            <h3>{data.title}</h3>
            <p>{data.subtitle}</p>
          </div>
          <div className={styles.share}>
            <svg width="18" viewBox="0 0 19 19" fill="none">
              <path
                d="M3 16L17 2M17 2V16M17 2H3"
                stroke="var(--bg)"
                strokeWidth="4"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>
        <Link className={styles.link} href={data.link}>
          {data.button}
        </Link>
      </div>
    </section>
  );
}
