"use client";

import { notFound } from "next/navigation";
import { EventType } from "@/types/types";
import useAxios from "@/hooks/useAxios";
import useUser from "@/hooks/useUser";
import Admin from "@/ui/admin/admin";
import { useRouterContext } from "@/hooks/useRouter";

export default function CreatePage() {
  const { replace } = useRouterContext();
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
      replace(`/events/${result._id}`);
    }
    MainButton.enable();
    MainButton.hideProgress();
  };

  return <Admin create={create} />;
}
