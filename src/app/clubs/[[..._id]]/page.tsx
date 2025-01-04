import { ClubType, EventType } from "@/types/types";
import axiosInstance from "@/hooks/axiosInstance";
import { notFound } from "next/navigation";
import Clubs from "@/ui/clubs/clubs";
import Club from "@/ui/club/club";

export default async function ClubsPage({
  params: { _id },
}: {
  params: { _id?: Array<string> };
}) {
  if (_id) {
    try {
      const { data } = await axiosInstance.get<
        ClubType & { members: number; rank: number; events: Array<EventType> }
      >(`/clubs?_id=${_id.join(``)}`);
      return <Club {...data} />;
    } catch (e) {
      return notFound();
    }
  }

  const { data } = await axiosInstance.get<
    Array<ClubType & { members: number }>
  >(`/clubs`);

  return <Clubs clubs={data} />;
}
