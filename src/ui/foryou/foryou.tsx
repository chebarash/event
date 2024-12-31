"use client";

import Link from "next/link";
import styles from "./foryou.module.css";
import { ForYouType } from "@/types/types";

export default function ForYou({
  title,
  subtitle,
  button,
  image,
  link,
}: ForYouType) {
  return (
    <section>
      <h2>For You</h2>
      <div
        className={styles.foryou}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.content}>
          <div className={styles.text}>
            <h3>{title}</h3>
            <p>{subtitle}</p>
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
        <Link className={styles.link} href={link}>
          {button}
        </Link>
      </div>
    </section>
  );
}
