import axiosInstance from "@/hooks/axiosInstance";
import ClubProvider from "@/hooks/useClub";
import { ClubType } from "@/types/types";
import { notFound } from "next/navigation";

export default async function ClubLayout({
  children,
  params: { _id },
}: Readonly<{
  children: React.ReactNode;
  params: { _id: string };
}>) {
  try {
    const { data } = await axiosInstance.get<ClubType>(`/clubs?_id=${_id}`);
    if (!data) return notFound();
    return <ClubProvider club={data}>{children}</ClubProvider>;
  } catch (e) {
    return notFound();
  }
}
