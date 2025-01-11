"use client";

import { ClubType } from "@/types/types";
import styles from "./clubs.module.css";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Clubs({
  clubs,
}: {
  clubs: Array<ClubType & { members: number }>;
}) {
  useEffect(() => {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.setParams({
      is_active: false,
      is_visible: false,
    });
  }, []);

  return (
    <main>
      <section>
        {clubs.map(({ _id, color, name, members, cover }) => (
          <Link
            prefetch={true}
            key={_id}
            href={`/clubs/${_id}`}
            className={styles.club}
            style={{ background: color }}
          >
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.date}>
              {members} {members === 1 ? "member" : "members"}
            </p>
            <div className={styles.cover}>
              <div
                className={styles.gradient}
                style={{
                  background: `linear-gradient(180deg,${color} 0%,${color}00 100%)`,
                }}
              ></div>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${cover}`}
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
        ))}
      </section>
    </main>
  );
}
