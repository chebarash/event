"use client";

import { useEventContext } from "@/hooks/useEvent";
import useUser from "@/hooks/useUser";
import Loading from "@/ui/loading/loading";
import Ticket from "@/ui/ticket/ticket";
import { notFound } from "next/navigation";

export default function TicketPage() {
  const { user, loading } = useUser();
  const { title, _id, registered } = useEventContext();

  if (!user && !loading) return notFound();
  if (!user) return <Loading />;

  return (
    <Ticket
      eventId={_id}
      _id={user._id}
      title={title}
      registered={registered.some(({ _id }) => user._id == _id)}
    />
  );
}
