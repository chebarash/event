"use client";
import { useEffect, useState } from "react";
import Calendar from "./components/calendar";
import Event from "./components/event";
import useTelegramInitData from "./hooks/telegram";
import styles from "./page.module.css";

const d = 1000 * 60 * 60 * 24;

const events: Array<{
  _id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  date: number;
  venue: string;
}> = [
  {
    _id: `gdsgdgds1`,
    title: `Gifted Hands for ACS`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now() + d,
    venue: `Conference Hall`,
  },
  {
    _id: `gdsgdgds2`,
    title: `Gifted Hands for ACS2`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now(),
    venue: `Conference Hall`,
  },
  {
    _id: `gdsgdgds3`,
    title: `Gifted Hands for ACS3`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now() + d,
    venue: `Conference Hall`,
  },
  {
    _id: `gdsgdgds4`,
    title: `Gifted Hands for ACS4`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now() + d * 2,
    venue: `Conference Hall`,
  },
  {
    _id: `gdsgdgds5`,
    title: `Gifted Hands for ACS5`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now() + d * 2,
    venue: `Conference Hall`,
  },
  {
    _id: `gdsgdgds6`,
    title: `Gifted Hands for ACS6`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now() + d * 2,
    venue: `Conference Hall`,
  },
  {
    _id: `gdsgdgds7`,
    title: `Gifted Hands for ACS7`,
    cover: `https://movieguide.b-cdn.net/wp-content/uploads/2014/05/Gifted-Hands-Review-Slider.jpg`,
    description: `Dr Ben Carson, a neurosurgeon who was raised by a single mother and faced many difficulties in his childhood, faces a challenge to operate two Siamese twins linked by the skull.`,
    author: `Shamsiddinkhuja`,
    date: Date.now() + d * 2,
    venue: `Conference Hall`,
  },
];

export default function Home() {
  const { hash } = useTelegramInitData();
  const [day, setDay] = useState<number>(0);

  useEffect(() => {
    console.log({ hash });
  }, [hash]);

  const list = events.filter(
    ({ date }) =>
      new Date(Date.now() + d * day).toDateString() ==
      new Date(date).toDateString()
  );

  return (
    <main className={styles.main}>
      <Calendar day={day} setDay={setDay} />
      {list.map((event) => (
        <Event {...event} key={event._id} />
      ))}
    </main>
  );
}
