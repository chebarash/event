"use client";

import useEvents from "@/hooks/useEvents";
import useUser from "@/hooks/useUser";
import Ticket from "@/ui/ticket/ticket";
import { notFound } from "next/navigation";

export default function TicketPage({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const { user, loading } = useUser();
  const { events } = useEvents();

  if (!events[_id] || (!user && !loading)) return notFound();

  return <>{user && <Ticket _id={user._id} title={events[_id].title} />}</>;
}
