"use client";

import useToast from "@/hooks/useToast";
import styles from "./page.module.css";
import useEvents from "@/hooks/useEvents";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const { toast } = useToast();
  const { user, loading } = useUser();
  const { events } = useEvents();
  const [data, setData] = useState(``);
  const event = events[_id];

  const timeTillEvent = event.date.getTime() - new Date().getTime();
  const timeTillDeadline = event.deadline
    ? event.deadline.getTime() - new Date().getTime()
    : 1;

  const canRegister = timeTillEvent > 0 && timeTillDeadline > 0;

  const fn = () => {
    const { showScanQrPopup, closeScanQrPopup } = window.Telegram.WebApp;
    showScanQrPopup(
      {
        text: "Scan Ticket",
      },
      (data) => {
        setData(data);
        closeScanQrPopup();
      }
    );
  };

  useEffect(() => {
    const { MainButton, themeParams } = window.Telegram.WebApp;
    if (
      user &&
      user.clubs.some(({ _id }) => _id == event.author._id) &&
      !canRegister
    ) {
      fn();
      MainButton.setParams({
        is_active: true,
        is_visible: true,
        text: `Scan Ticket`,
        color: themeParams.button_color,
        text_color: themeParams.button_text_color,
      });
      MainButton.onClick(fn);
    }
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(fn);
    };
  }, []);

  if (!event) return notFound();
  if (!loading && !user?.clubs.some(({ _id }) => _id == event.author._id))
    return notFound();

  return (
    <main>
      <ul className={styles.registered}>
        {event.registered.map(({ name, picture, email, id }) => (
          <li key={id}>
            <Image
              src={picture || `/profile.png`}
              width={40}
              height={40}
              alt="profile"
            />
            <div>
              <h3>{name}</h3>
              <pre
                onClick={() => {
                  navigator.clipboard.writeText(`${id}`);
                  toast(`Copied to clipboard`);
                }}
              >
                {id}
              </pre>
              <p>{email}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
