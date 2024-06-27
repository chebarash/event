/*
"use client";
import { Suspense, useEffect, useState } from "react";
import Calendar from "./components/calendar";
import Event from "./components/event";
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
  const [day, setDay] = useState<number>(0);
  const [dd, setDd] = useState<string>();

  const list = events.filter(
    ({ date }) =>
      new Date(Date.now() + d * day).toDateString() ==
      new Date(date).toDateString()
  );

  useEffect(() => {
    setDd(window.Telegram.WebApp.initDataUnsafe.start_param);
  }, []);

  return (
    <main className={styles.main}>
      {dd}
      <Suspense>
        <Calendar day={day} setDay={setDay} />
        {list.length ? (
          list.map((event) => <Event {...event} key={event._id} />)
        ) : (
          <p className={styles.no}>No Events</p>
        )}
      </Suspense>
    </main>
  );
}
*/
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const { data: session } = useSession();
  console.log(session);
  const sendHandler = async function () {
    console.log("sent", session);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/access`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.authToken}`,
        },
      }
    );
    const res = await result.json();
    console.log(res);
    setResponse(res.data);
  };
  return (
    <div className="flex flex-col gap-20 justify-center items-center h-screen">
      {session?.user && (
        <div className="flex flex-col gap-8">
          <p>You are signed in right now</p>
          <button
            onClick={async () => await signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      )}

      {!session?.user && (
        <div className="flex flex-col gap-8">
          <p>You are not signed in right now</p>
          <button
            onClick={async () => await signIn("google")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out"
          >
            <h1 className="text-xl">Sign In</h1>
          </button>
        </div>
      )}

      <p className="text-3xl text-center">
        {response
          ? response
          : "Send request now to check if you are authorised"}
      </p>
      <button
        onClick={sendHandler}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
      >
        <p className="text-xl">Send Request</p>
      </button>
    </div>
  );
}
