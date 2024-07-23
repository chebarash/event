"use client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  JSX,
  useRef,
} from "react";
import styles from "./calendar.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import useEvents from "../hooks/useEvents";

export default function Calendar({
  day,
  setDay,
}: {
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
}) {
  const [month, setMonth] = useState<string>();
  const [list, setList] = useState<Array<JSX.Element>>([]);
  const params = useSearchParams().get(`_id`);
  const router = useRouter();
  const { events, loading } = useEvents();
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
    if (!loading && params) {
      const event = events.find(({ _id }) => _id == params);
      if (event) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        event.date.setHours(0, 0, 0, 0);
        setDay(
          Math.round(
            (event.date.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
          )
        );
      } else router.push(`?`);
    }
  }, [params, events, loading]);

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
          className={
            [6, 0].includes(thisDay.getDay()) ? styles.weekend : styles.li
          }
        >
          <button
            className={[styles.button, i == day ? styles.active : ``].join(` `)}
            onClick={() => setDay(i)}
            disabled={
              !events.filter(
                ({ date }) => thisDay.toDateString() == date.toDateString()
              ).length
            }
          >
            <p className={styles.day}>
              {thisDay
                .toLocaleDateString(`en`, { weekday: `short` })
                .slice(0, 2)}
            </p>
            <p className={styles.date}>{thisDay.getDate()}</p>
          </button>
        </li>,
      ]);
    }
  }, [day, events]);

  return (
    <section
      className={[styles.section, !params ? `` : styles.nothome].join(` `)}
    >
      <p className={styles.title}>{month}</p>
      <ul className={styles.list} ref={scrollContainerRef}>
        {list}
      </ul>
    </section>
  );
}
