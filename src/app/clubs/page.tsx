import { ClubType } from "@/types/types";
import axiosInstance from "@/hooks/axiosInstance";
import Clubs from "@/ui/clubs/clubs";

export const dynamic = "force-dynamic";

export default async function ClubsPage() {
  const { data } = await axiosInstance.get<Array<ClubType>>(`/clubs`);

  return <Clubs clubs={data} />;
}
