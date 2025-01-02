"use client";
import { createContext, useContext } from "react";
import { UserType } from "../types/types";
import useAxios from "./useAxios";
import { AxiosRequestConfig } from "axios";

const UserContext = createContext<{
  user: UserType | null;
  loading: boolean;
  fetchData: (config: AxiosRequestConfig) => any;
}>({
  user: null,
  loading: true,
  fetchData: () => {},
});

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, loading, fetchData } = useAxios<UserType>({
    url: `/user`,
    method: `get`,
  });

  return (
    <UserContext.Provider value={{ user: data, loading, fetchData }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
