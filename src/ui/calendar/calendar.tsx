"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./calendar.module.css";
import { DailyType } from "@/types/types";
import useUser from "@/hooks/useUser";
import Link from "next/link";

export default function Calendar({ daily }: { daily: DailyType }) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [list, setList] = useState<Array<JSX.Element>>([]);
  const [month, setMonth] = useState<string>();
  const day = useSearchParams().get(`day`);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    setMonth(date.toLocaleString(`en`, { month: `long` }));
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const elements = scrollContainerRef.current.children;
        let visibleElementIndex = -1;

        for (let i = 0; i < elements.length; i++) {
          const rect = elements[i].getBoundingClientRect();
          if (rect.left >= 0 && rect.right <= window.innerWidth) {
            visibleElementIndex = i;
            break;
          }
        }

        const thisDay = new Date(date);
        thisDay.setDate(date.getDate() + visibleElementIndex);
        setMonth(thisDay.toLocaleString(`en`, { month: `long` }));
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!day) router.push(`/?day=0`);
  }, [day, router]);

  useEffect(() => {
    const date = new Date();
    setList([]);
    for (let i = 0; i < 40; i++) {
      const thisDay = new Date(date);
      thisDay.setDate(date.getDate() + i);
      setList((list) => [
        ...list,
        <li
          key={i}
          className={[
            styles.li,
            [6, 0].includes(thisDay.getDay()) ? styles.weekend : ``,
            daily[thisDay.toDateString()]?.filter(
              ({ author: { _id }, private: p }) =>
                (user && user.member.some((c) => c._id === _id)) || !p
            ).length
              ? ``
              : styles.disabled,
            `${i}` == day ? styles.active : ``,
          ].join(` `)}
        >
          <Link href={`/?day=${i}`} className={styles.button}>
            <p className={styles.day}>
              {thisDay.toLocaleDateString(`en`, { weekday: `short` })}
            </p>
            <p className={styles.date}>
              {String(thisDay.getDate()).padStart(2, "0")}
            </p>
          </Link>
        </li>,
      ]);
    }
  }, [day, daily, user]);

  return (
    <section>
      <h2>{month}</h2>
      <ul className={styles.list} ref={scrollContainerRef}>
        {list}
      </ul>
    </section>
  );
}
