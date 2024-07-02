"use client";
import { createContext, useContext } from "react";
import { UserType } from "../types/types";
import useAxios from "./useAxios";

const UserContext = createContext<UserType | null>(null);

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error, loading } = useAxios<UserType>({
    url: `/user`,
    method: `get`,
  });

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default function useUser() {
  return useContext(UserContext);
}
