"use client";

import useEvents from "@/hooks/useEvents";
import useUser from "@/hooks/useUser";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const { user, loading } = useUser();
  const { events } = useEvents();
  const [data, setData] = useState(``);
  const event = events[_id];

  useEffect(() => {
    if (
      user &&
      (user.clubs.map(({ _id }) => _id).includes(event.author._id) ||
        user._id == event.author._id)
    )
      window.Telegram.WebApp.showScanQrPopup(
        {
          text: "Scan this QR code to join the event",
        },
        (data) => {
          setData(data);
          window.Telegram.WebApp.closeScanQrPopup();
        }
      );
  }, []);
  if (!event) return notFound();
  if (
    !loading &&
    !(
      user?.clubs.map(({ _id }) => _id).includes(event.author._id) ||
      user?._id == event.author._id
    )
  )
    return notFound();

  return <main>{data}</main>;
}
