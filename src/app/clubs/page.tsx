import { ClubType } from "@/types/types";
import axiosInstance from "@/hooks/axiosInstance";
import Clubs from "@/ui/clubs/clubs";

export const dynamic = "force-dynamic";

export default async function ClubsPage({
  searchParams,
}: {
  searchParams?: { parties?: string };
}) {
  const { data } = await axiosInstance.get<Array<ClubType>>(`/clubs`);

  const res = searchParams?.parties
    ? data.filter(({ _id }) => [`6797b731a0297fc8703b182c`].includes(_id))
    : data;

  return <Clubs clubs={res} />;
}
