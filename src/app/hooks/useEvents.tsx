"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { EventType } from "../types/types";
import useAxios from "./useAxios";

const EventsContext = createContext<{
  events: Array<EventType>;
  loading: boolean;
  error?: string | null;
  update: (_id: string) => any;
}>({
  events: [],
  loading: true,
  update: () => {},
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
  const { fetchData } = useAxios<{ registered: boolean }>({
    url: `/registration`,
    method: `get`,
    manual: true,
  });

  useEffect(() => {
    if (data) setEvents(data);
  }, [data]);

  const update = async (_id: string) => {
    const event = events.find((event) => event._id == _id);
    if (event) {
      window.Telegram.WebApp.MainButton.showProgress(true);
      const result = await fetchData({
        _id,
        ...(event.registered ? { registered: true } : {}),
      });
      if (result)
        setEvents(
          events.map((event) => ({
            ...event,
            registered: _id == event._id ? result.registered : event.registered,
          }))
        );
      window.Telegram.WebApp.MainButton.hideProgress();
    }
  };

  return (
    <EventsContext.Provider value={{ events, loading, error, update }}>
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  return useContext(EventsContext);
}
