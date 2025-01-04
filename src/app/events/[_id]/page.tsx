"use client";

import { useEventContext } from "@/hooks/useEvent";
import Event from "@/ui/event/event";

export default function EventPage() {
  const event = useEventContext();
  return <Event {...event} />;
}
