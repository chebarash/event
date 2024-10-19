"use client";
import { createContext, useContext } from "react";
import { DailyType, EventsType, RegistrationType } from "../types/types";
import useAxios from "./useAxios";

const EventsContext = createContext<{
  events: EventsType;
  daily: DailyType;
  registrations: Array<RegistrationType>;
  loading: boolean;
  update: (_id: string) => any;
}>({
  events: {},
  daily: {},
  registrations: [],
  loading: true,
  update: () => {},
});

export function EventsProvider({
  children,
  events,
  daily,
}: Readonly<{
  children: React.ReactNode;
  events: EventsType;
  daily: DailyType;
}>) {
  const { data, loading, fetchData } = useAxios<Array<RegistrationType>>({
    url: `/registration`,
    method: `get`,
  });

  const update = async (_id: string) => {
    if (events[_id]) {
      const { MainButton, HapticFeedback } = window.Telegram.WebApp;
      MainButton.showProgress(true);
      MainButton.disable();
      const result = await fetchData({
        params: {
          _id,
          ...(data?.includes(_id) ? { registered: true } : {}),
        },
      });
      if (result) {
        if (result.includes(_id)) {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
        HapticFeedback.notificationOccurred(
          result.includes(_id) ? `success` : `warning`
        );
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
        registrations: data || [],
        loading,
        update,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  return useContext(EventsContext);
}
