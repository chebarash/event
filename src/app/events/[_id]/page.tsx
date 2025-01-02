"use client";
import useEvents from "@/hooks/useEvents";
import useUser from "@/hooks/useUser";
import Event from "@/ui/event/event";

export default function EventPage({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const { user, loading } = useUser();
  const { events, isRegistered } = useEvents();

  if (!events[_id] || loading) return <></>;

  return (
    <Event
      {...events[_id]}
      registration={isRegistered(events[_id], user?._id)}
    />
  );
}
