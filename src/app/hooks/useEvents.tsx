"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DailyType, EventsType, EventType, UserType } from "../types/types";
import useAxios from "./useAxios";
import useUser from "./useUser";

const EventsContext = createContext<{
  events: EventsType;
  daily: DailyType;
  loading: boolean;
  update: (_id: string) => any;
  isParticipant: (event: EventType, _id?: string) => boolean;
}>({
  events: {},
  daily: {},
  loading: true,
  update: () => {},
  isParticipant: (event: EventType, _id?: string) =>
    event.participants.some((p) => _id === p._id),
});

export function EventsProvider({
  children,
  event: e,
}: Readonly<{
  children: React.ReactNode;
  event: Array<EventType>;
}>) {
  const ev: EventsType = {};
  const da: DailyType = {};

  e.forEach((event) => {
    ev[event._id] = event;
    const day = event.date.toDateString();
    if (!da[day]) da[day] = [];
    da[day].push(event);
  });

  const [events, setEvents] = useState<EventsType>(ev);
  const [daily, setDaily] = useState<DailyType>(da);

  const { user } = useUser();
  const { loading, fetchData } = useAxios<EventType>({
    url: `/registration`,
    method: `get`,
    manual: true,
  });

  const isParticipant = (event: EventType, _id?: string) =>
    event.participants.some((p) => _id === p._id);

  useEffect(() => {
    setEvents((_) => {
      const res: EventsType = {};
      const daily: DailyType = {};
      e.filter(
        ({ author: { _id }, private: p }) =>
          (user &&
            [
              ...(user.clubs?.map(({ _id }) => _id) || []),
              ...(user.member || []),
              user._id,
            ].includes(_id)) ||
          !p
      ).forEach((event) => {
        res[event._id] = event;
        const day = event.date.toDateString();
        if (!daily[day]) daily[day] = [];
        daily[day].push(event);
      });
      setDaily(daily);
      return res;
    });
  }, [user]);

  const update = async (_id: string) => {
    if (events[_id]) {
      const { MainButton, HapticFeedback } = window.Telegram.WebApp;
      MainButton.showProgress(true);
      MainButton.disable();
      const registered = isParticipant(events[_id], user?._id);
      const result = await fetchData({
        params: {
          _id,
          ...(registered ? { registered: true } : {}),
        },
      });
      if (result) {
        if (!registered) {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
        setEvents((e) => {
          const res = { ...e, [_id]: result };
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
        HapticFeedback.notificationOccurred(registered ? `success` : `warning`);
      }
      MainButton.enable();
      MainButton.hideProgress();
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        daily,
        loading,
        update,
        isParticipant,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  return useContext(EventsContext);
}
