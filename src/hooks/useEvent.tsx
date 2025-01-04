"use client";

import { EventContextType, EventType } from "@/types/types";
import { createContext, use, useContext, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Loading from "@/ui/loading/loading";
import useAxios from "./useAxios";
import useUser from "./useUser";

const EventContext = createContext<EventContextType>({
  _id: ``,
  title: ``,
  picture: ``,
  color: ``,
  description: ``,
  author: {
    _id: ``,
    name: ``,
    description: ``,
    cover: ``,
    username: ``,
    links: [],
    hidden: false,
    color: ``,
    leader: {
      _id: ``,
      name: ``,
      email: ``,
      id: 0,
      clubs: [],
      member: [],
    },
  },
  date: new Date(),
  venue: ``,
  duration: 1,
  shares: 0,
  registered: [],
  participated: [],
  hashtags: [],
  isRegistered: false,
  isParticipated: false,
  update: () => {},
  edit: (event: Partial<EventType>) => {},
  participate: (participant: string) => {},
});

export function useEventContext() {
  return useContext(EventContext);
}

export default function EventProvider({
  children,
  event: initial,
}: {
  children: any;
  event: EventType;
}) {
  const router = useRouter();
  const [event, set] = useState<EventType>(initial);
  const { user, loading } = useUser();
  const { fetchData: fetchRegister } = useAxios<EventType>({
    url: `/registered`,
    method: `post`,
    manual: true,
  });
  const { fetchData: fetchEdit } = useAxios<EventType>({
    url: `/event`,
    method: `put`,
    manual: true,
  });
  const { fetchData: fetchParticipate } = useAxios<EventType>({
    url: `/participated`,
    method: `post`,
    manual: true,
  });

  const setEvent = (result: EventType) =>
    set((event) => ({
      ...event,
      ...result,
      isRegistered: result.registered.some(({ _id }) => user?._id === _id),
      isParticipated: result.participated.some(({ _id }) => user?._id === _id),
    }));

  useEffect(() => {
    set((event) => ({
      ...event,
      isRegistered: event.registered.some(({ _id }) => user?._id === _id),
      isParticipated: event.participated.some(({ _id }) => user?._id === _id),
    }));
  }, [user]);

  const action = async (fn: () => Promise<EventType | null>) => {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.showProgress(true);
    MainButton.disable();
    const result = await fn();
    if (result) setEvent(result);
    MainButton.enable();
    MainButton.hideProgress();
  };

  const update = async () =>
    await action(async () => {
      const result = await fetchRegister({
        data: {
          _id: event._id,
          registered: event.isRegistered,
        },
      });
      if (!event.registered) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      window.Telegram.WebApp.HapticFeedback.notificationOccurred(
        !event.registered ? `success` : `warning`
      );
      return result;
    });

  const edit = async (data: EventType) =>
    await action(async () => {
      const result = await fetchEdit({ data });
      if (result) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`);
        router.back();
      }
      return result;
    });

  const participate = async (participant: string) =>
    await action(async () => {
      const result = await fetchParticipate({
        data: { _id: event._id, participant },
      });
      window.Telegram.WebApp.HapticFeedback.notificationOccurred(
        result ? `success` : `error`
      );
      return result;
    });

  let next: any = children;

  if (event.private)
    if (!user && loading) {
      next = <Loading />;
    } else if (!user && !loading) {
      next = notFound();
    } else if (
      user &&
      ![...user.member, ...user.clubs].some(
        ({ _id }) => _id == event.author._id
      )
    ) {
      next = notFound();
    }

  return (
    <EventContext.Provider value={{ ...event, update, edit, participate }}>
      {next}
    </EventContext.Provider>
  );
}
