"use client";

import { notFound, useRouter } from "next/navigation";
import { EventType } from "@/types/types";
import useAxios from "@/hooks/useAxios";
import useUser from "@/hooks/useUser";
import Admin from "@/ui/admin/admin";

export default function CreatePage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const { fetchData } = useAxios<EventType>({
    url: `/event`,
    method: `post`,
    manual: true,
  });

  if (!loading && !user?.clubs.length) return notFound();

  const create = async (data: EventType) => {
    const { MainButton, HapticFeedback } = window.Telegram.WebApp;
    MainButton.showProgress(true);
    MainButton.disable();
    const result = await fetchData({
      data: { ...data, _id: undefined },
    });
    if (result) {
      HapticFeedback.notificationOccurred(`success`);
      router.replace(`/events/${result._id}`);
    }
    MainButton.enable();
    MainButton.hideProgress();
  };

  return <Admin create={create} />;
}
