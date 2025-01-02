"use client";

import Link from "next/link";
import styles from "./foryou.module.css";
import { ForYouType } from "@/types/types";
import Image from "next/image";

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
      <Link className={styles.foryou} href={link}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <div className={styles.share}>
            <svg width="20" height="21" viewBox="0 0 20 21">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.0003 0.5H20.0003V19.5H16.0003V7.32843L3.0003 20.3284L0.171875 17.5L13.1719 4.5H1.0003V0.5Z"
                fill="var(--bg)"
              />
            </svg>
          </div>
        </div>
        <div className={styles.link}>{button}</div>
        <Image
          alt="background"
          priority
          src={image}
          fill
          style={{ objectFit: "cover" }}
        />
      </Link>
    </section>
  );
}
