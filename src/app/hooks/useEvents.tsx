"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { EventType, RegistrationType } from "../types/types";
import useAxios from "./useAxios";

const EventsContext = createContext<{
  events: Array<EventType>;
  loading: boolean;
  error?: string | null;
  update: (_id: string) => any;
  participated: (_id: string) => any;
  fetchData: () => any;
}>({
  events: [],
  loading: true,
  update: () => {},
  participated: () => {},
  fetchData: () => {},
});

export function EventsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, error, fetchData } = useAxios<Array<EventType>>({
    url: `/event`,
    method: `get`,
  });

  const { fetchData: registration } = useAxios<{
    registration?: RegistrationType;
  }>({
    url: `/registration`,
    method: `get`,
    manual: true,
  });
  const { fetchData: participate } = useAxios<{
    registration: RegistrationType;
  }>({
    url: `/participate`,
    method: `get`,
    manual: true,
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
      setLoading(false);
    }
  }, [data]);

  const update = async (_id: string) => {
    const event = events.find((event) => event._id == _id);
    if (event) {
      const { MainButton, HapticFeedback } = window.Telegram.WebApp;
      MainButton.showProgress(true);
      MainButton.disable();
      const result = await registration({
        params: {
          _id,
          ...(event.registration ? { registered: true } : {}),
        },
      });
      if (result) {
        if (result.registration) {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
        setEvents(
          events.map((event) => ({
            ...event,
            registration:
              _id == event._id ? result.registration : event.registration,
          }))
        );
        HapticFeedback.notificationOccurred(
          result.registration ? `success` : `warning`
        );
      }
      MainButton.enable();
      MainButton.hideProgress();
    }
  };

  const participated = async (_id: string) => {
    const event = events.find((event) => event._id == _id);
    if (event) {
      const result = await participate({ params: { _id } });
      if (result) {
        const { closeScanQrPopup, HapticFeedback } = window.Telegram.WebApp;
        closeScanQrPopup();
        setEvents(
          events.map((event) => ({
            ...event,
            registration:
              _id == event._id ? result.registration : event.registration,
          }))
        );
        HapticFeedback.notificationOccurred(`success`);
      }
    }
  };

  return (
    <EventsContext.Provider
      value={{ events, loading, error, update, participated, fetchData }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  return useContext(EventsContext);
}
