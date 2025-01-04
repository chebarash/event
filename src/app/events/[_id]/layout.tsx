import axiosInstance from "@/hooks/axiosInstance";
import EventProvider from "@/hooks/useEvent";
import { EventType } from "@/types/types";
import { notFound } from "next/navigation";

export default async function EventLayout({
  children,
  params: { _id },
}: Readonly<{
  children: React.ReactNode;
  params: { _id: string };
}>) {
  try {
    const { data } = await axiosInstance.get<EventType>(`/event?_id=${_id}`);
    if (!data) return notFound();
    return <EventProvider event={data}>{children}</EventProvider>;
  } catch (e) {
    return notFound();
  }
}
