"use client";

import { useEventContext } from "@/hooks/useEvent";
import useUser from "@/hooks/useUser";
import { notFound } from "next/navigation";
import Admin from "@/ui/admin/admin";

export default function EditPage() {
  const { user, loading } = useUser();
  const event = useEventContext();

  if (!loading && !user?.clubs.some(({ _id }) => _id == event.author._id))
    return notFound();

  return <Admin {...event} editing />;
}
