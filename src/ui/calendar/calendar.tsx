"use client";

import useEvents from "@/hooks/useEvents";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "./calendar.module.css";

export default function Calendar() {
  const [month, setMonth] = useState<string>();
  const [list, setList] = useState<Array<JSX.Element>>([]);
  const day = useSearchParams().get(`day`);
  const router = useRouter();
  const { daily } = useEvents();
  const scrollContainerRef = useRef<HTMLUListElement>(null);

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

    scrollContainerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!day) router.push(`/?day=0`);
  }, [day]);

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
            daily[thisDay.toDateString()] ? `` : styles.disabled,
            `${i}` == day ? styles.active : ``,
          ].join(` `)}
          ref={(ref) => {
            if (`${i}` == day)
              ref?.scrollIntoView({ inline: `nearest`, block: `nearest` });
          }}
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
  }, [day, daily]);

  return (
    <section>
      <h2>{month}</h2>
      <ul className={styles.list} ref={scrollContainerRef}>
        {list}
      </ul>
    </section>
  );
}
