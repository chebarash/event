import { ClubType } from "@/types/types";
import axiosInstance from "@/hooks/axiosInstance";
import Clubs from "@/ui/clubs/clubs";

export const dynamic = "force-dynamic";

const parties = [`6797b731a0297fc8703b182c`,`67f3828eb35dbc13cd81f7ea`, `67f4faec64ae6a357ed27524`, `67f649a14697aa67579b2166`];

export default async function ClubsPage({
  searchParams,
}: {
  searchParams?: { parties?: string };
}) {
  const { data } = await axiosInstance.get<Array<ClubType>>(`/clubs`);

  const res = searchParams?.parties
    ? data.filter(({ _id }) => parties.includes(_id))
    : data.filter(({ _id }) => !parties.includes(_id));

  return <Clubs clubs={res} />;
}
