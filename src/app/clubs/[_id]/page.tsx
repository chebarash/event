import axiosInstance from "@/hooks/axiosInstance";
import { ClubType, EventType } from "@/types/types";
import Club from "@/ui/club/club";

export default async function ClubsPage({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const result = await axiosInstance.get<
    ClubType & { members: number; rank: number; events: Array<EventType> }
  >(`/clubs?_id=${_id}`);

  return <Club {...result.data} />;
}
