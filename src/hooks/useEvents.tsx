"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DailyType, EventsType, EventType } from "../types/types";
import useAxios from "./useAxios";
import useUser from "./useUser";
import { useRouter } from "next/navigation";

const EventsContext = createContext<{
  events: EventsType;
  daily: DailyType;
  loading: boolean;
  update: (_id: string) => any;
  isRegistered: (event: EventType, _id?: string) => boolean;
  editEvent: (event: EventType) => any;
  createEvent: (event: EventType) => any;
}>({
  events: {},
  daily: {},
  loading: true,
  update: () => {},
  isRegistered: (event: EventType, _id?: string) =>
    event.registered.some((p) => _id === p._id),
  editEvent: (event: EventType) => {},
  createEvent: (event: EventType) => {},
});

export function EventsProvider({
  children,
  event: e,
}: Readonly<{
  children: React.ReactNode;
  event: Array<EventType>;
}>) {
  let initial: Array<EventType> = e;
  const ev: EventsType = {};
  const da: DailyType = {};

  initial.forEach((event) => {
    ev[event._id] = event;
    const day = event.date.toDateString();
    if (!da[day]) da[day] = [];
    da[day].push(event);
  });

  const router = useRouter();
  const [events, setEvents] = useState<EventsType>(ev);
  const [daily, setDaily] = useState<DailyType>(da);

  const { user } = useUser();
  const { loading, fetchData } = useAxios<EventType>({
    url: `/registered`,
    method: `post`,
    manual: true,
  });
  const { fetchData: edit } = useAxios<EventType>({
    url: `/event`,
    method: `put`,
    manual: true,
  });
  const { fetchData: create } = useAxios<EventType>({
    url: `/event`,
    method: `post`,
    manual: true,
  });

  const isRegistered = (event: EventType, _id?: string) =>
    event.registered.some((p) => _id === p._id);

  useEffect(() => {
    setEvents((_) => {
      const res: EventsType = {};
      const daily: DailyType = {};
      initial
        .filter(
          ({ author: { _id }, private: p }) =>
            (user &&
              [
                ...(user.clubs?.map(({ _id }) => _id) || []),
                ...(user.member || []),
                user._id,
              ].includes(_id)) ||
            !p
        )
        .forEach((event) => {
          res[event._id] = event;
          const day = event.date.toDateString();
          if (!daily[day]) daily[day] = [];
          daily[day].push(event);
        });
      setDaily(daily);
      return res;
    });
  }, [user, initial]);

  const upd = async (fn: () => Promise<EventType | null>) => {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.showProgress(true);
    MainButton.disable();
    const result = await fn();
    if (result) {
      initial.push(result);
      setEvents((e) => {
        const res = { ...e, [result._id]: result };
        setDaily(() => {
          const daily: DailyType = {};

          Object.values(res).forEach((event) => {
            const day = event.date.toDateString();
            if (!daily[day]) daily[day] = [];
            daily[day].push(event);
          });

          return daily;
        });
        return res;
      });
    }
    MainButton.enable();
    MainButton.hideProgress();
  };

  const update = async (_id: string) => {
    if (events[_id])
      await upd(async () => {
        const registered = isRegistered(events[_id], user?._id);
        const result = await fetchData({
          data: {
            _id,
            ...(registered ? { registered: true } : {}),
          },
        });
        if (!registered) {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(
          registered ? `success` : `warning`
        );
        return result;
      });
  };

  const editEvent = async (event: EventType) => {
    if (events[event._id]) {
      await upd(async () => {
        const result = await edit({
          data: { ...event },
        });
        if (result) {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`);
          router.replace(`/events/${result._id}`);
        }
        return result;
      });
    }
  };

  const createEvent = async (event: EventType) =>
    await upd(async () => {
      const result = await create({
        data: { ...event, _id: undefined },
      });
      if (result) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`);
        router.replace(`/events/${result._id}`);
      }
      return result;
    });

  return (
    <EventsContext.Provider
      value={{
        events,
        daily,
        loading,
        update,
        isRegistered,
        editEvent,
        createEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  return useContext(EventsContext);
}
