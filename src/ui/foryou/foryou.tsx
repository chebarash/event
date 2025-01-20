"use client";

import { ForYouType } from "@/types/types";
import styles from "./foryou.module.css";
import Image from "next/image";
import Link from "next/link";

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
      <div className={styles.slider}>
        <Link
          prefetch={true}
          className={styles.foryou}
          href="/clubs"
          style={{
            background: `#F2F2EA`,
            gap: `var(--gapText)`,
            position: `relative`,
          }}
        >
          <div
            className={styles.text}
            style={{ gap: 0, textShadow: `none`, color: `#000000`, zIndex: 1 }}
          >
            <h3>create</h3>
            <h3>lead</h3>
            <h3>inspire</h3>
          </div>
          <div
            className={styles.link}
            style={{ background: `#000000`, color: `#ffffff` }}
          >
            Clubs
          </div>
          <svg
            width="227"
            height="170"
            viewBox="0 0 227 170"
            style={{ position: `absolute`, right: 0, bottom: 0 }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M110.916 1.61804C93.8077 3.66588 94.2638 2.75539 94.2638 35.3113V64.452L77.8416 57.8486C42.2588 43.9626 36.7821 47.3763 15.3409 97.69C5.76056 120 5.53327 119.545 29.484 131.61L49.1007 141.4C49.1007 141.4 3.93761 177.143 4.62102 176.459C-0.625226 181.24 -1.53755 188.981 2.56916 194.673C36.7836 243.846 69.4023 257.506 94.9488 233.602L101.335 227.682L101.792 239.977C102.02 246.806 102.02 257.733 101.563 264.108C100.422 287.329 125.285 292.565 197.136 284.369C218.806 281.866 217.438 283.687 215.84 257.733L214.472 234.741L221.087 238.154C244.581 250.221 253.248 246.124 279.023 212.202C305.254 177.598 304.342 181.012 290.2 169.174C273.549 155.059 254.162 140.035 250.969 138.896C263.513 125.237 286.551 99.511 286.551 99.511C289.744 96.3227 291.34 91.9986 291.34 87.6729C291.34 83.3472 289.288 79.0216 286.095 76.0617C248.003 41.2296 226.333 33.2619 207.628 47.6046L197.136 55.5723C197.136 55.5723 196.453 15.9592 196.224 13.4561C195.311 3.21063 150.377 -3.16293 110.916 1.61652V1.61804ZM182.994 97.0064C193.258 95.4122 205.348 88.8103 218.123 77.4275C231.579 65.3625 231.352 65.3625 244.354 76.0617C250.056 80.8426 255.757 85.3951 257.126 86.3056C258.723 87.4446 257.126 90.176 252.792 94.0464C210.594 130.7 199.417 147.092 216.296 147.092C219.262 147.092 258.952 179.191 258.952 179.191L232.492 217.438L225.421 213.112C180.258 185.566 167.712 189.892 178.204 229.505C186.872 262.287 187.328 267.524 180.029 267.524C177.063 267.524 140.341 270.482 140.341 270.482L138.971 243.391C137.602 214.023 139.656 157.791 86.052 204.69C70.542 218.349 68.4886 221.535 61.4178 214.023C59.3644 211.747 41.5722 190.118 41.5722 190.118C41.5722 190.118 68.4886 168.263 74.191 164.166C101.335 145.726 97.6856 143.677 65.9807 127.284C53.8909 120.911 43.3983 115.219 42.4876 114.309C41.5738 113.398 62.1012 74.2407 62.1012 74.2407L83.7713 85.3951C114.337 101.332 131.671 103.608 128.251 83.8025C125.969 70.1434 125.969 20.0581 125.969 20.0581L163.605 19.6012C163.605 19.6012 159.271 60.5816 161.324 81.5247C162.693 90.6313 164.29 99.7379 182.994 97.0064Z"
              fill="#F64243"
              fillOpacity="0.8"
            />
          </svg>
        </Link>
        <Link prefetch={true} className={styles.foryou} href={link}>
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
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${image}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
    </section>
  );
}
