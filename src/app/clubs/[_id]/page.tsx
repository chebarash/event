"use client";

import Club from "@/ui/club/club";
import { useClubContext } from "@/hooks/useClub";

export default function ClubPage() {
  const club = useClubContext();
  return <Club {...club} />;
}
