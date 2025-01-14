"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { UserContextType, UserType } from "../types/types";
import useAxios from "./useAxios";

const UserContext = createContext<{
  user?: UserContextType;
  loading: boolean;
  fetchData: (config: AxiosRequestConfig) => any;
}>({
  loading: true,
  fetchData: () => {},
});

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<UserContextType>();
  const { data, loading, fetchData } = useAxios<UserType>({
    url: `/user`,
    method: `get`,
  });

  useEffect(() => {
    const { expand, disableVerticalSwipes, ready, CloudStorage, initData } =
      window.Telegram.WebApp;
    if (initData.length)
      CloudStorage.getItem(`user`, (_, u) => {
        if (u)
          setUser((user) =>
            typeof user == `undefined`
              ? { ...JSON.parse(u), initial: true }
              : user
          );
      });
    disableVerticalSwipes();
    expand();
    ready();
    setLoaded(true);
  }, []);

  useEffect(() => {
    const { CloudStorage, initData } = window.Telegram.WebApp;
    setUser(data);
    if (initData.length)
      if (data) CloudStorage.setItem(`user`, JSON.stringify(data));
      else CloudStorage.removeItem(`user`);
  }, [data]);

  return (
    <UserContext.Provider value={{ user, loading, fetchData }}>
      {loaded && children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
