"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { EventType } from "../types/types";
import useAxios from "./useAxios";

const EventsContext = createContext<{
  events: Array<EventType>;
  loading: boolean;
  error?: string | null;
  unregister: (_id: string) => any;
  register: (_id: string) => any;
}>({
  events: [],
  loading: true,
  unregister: () => {},
  register: () => {},
});

export function EventsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const { data, error, loading } = useAxios<Array<EventType>>({
    url: `/event`,
    method: `get`,
  });
  const { fetchData } = useAxios<Array<EventType>>({
    url: `/registration`,
    method: `get`,
    manual: true,
  });

  useEffect(() => {
    if (data) setEvents(data);
  }, [data]);

  const update = async (params: { _id: string; registered?: boolean }) => {
    window.Telegram.WebApp.MainButton.showProgress(true);
    const result = await fetchData(params);
    if (result)
      setEvents((events) =>
        events.map((event) => ({
          ...event,
          registered:
            params._id == event._id ? !params.registered : event.registered,
        }))
      );
    window.Telegram.WebApp.MainButton.hideProgress();
  };

  const unregister = (_id: string) => update({ _id, registered: true });
  const register = (_id: string) => update({ _id });

  return (
    <EventsContext.Provider
      value={{ events, loading, error, unregister, register }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  return useContext(EventsContext);
}
