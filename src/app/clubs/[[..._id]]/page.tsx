import axiosInstance from "@/hooks/axiosInstance";
import { ClubType, EventType } from "@/types/types";
import Club from "@/ui/club/club";
import Clubs from "@/ui/clubs/clubs";

export default async function ClubsPage({
  params: { _id },
}: {
  params: { _id?: Array<string> };
}) {
  if (_id) {
    const { data } = await axiosInstance.get<
      ClubType & { members: number; rank: number; events: Array<EventType> }
    >(`/clubs?_id=${_id.join(``)}`);

    return <Club {...data} />;
  }

  const { data } = await axiosInstance.get<
    Array<ClubType & { members: number }>
  >(`/clubs`);

  return <Clubs clubs={data} />;
}
