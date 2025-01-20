"use client";

import { createContext, useContext, useState } from "react";
import useAxios from "./useAxios";
import useUser from "./useUser";
import {
  ClubContextType,
  ClubType,
  ShortClubType,
  UserType,
} from "@/types/types";
import { useRouterContext } from "./useRouter";

const ClubContext = createContext<ClubContextType>({
  _id: ``,
  name: ``,
  description: ``,
  cover: ``,
  hidden: false,
  leader: {
    _id: ``,
    name: ``,
    email: ``,
    id: 0,
    member: [],
    clubs: [],
  },
  fg: ``,
  bg: ``,
  members: [],
  rank: 0,
  events: [],
  update: () => {},
  edit: (club: ShortClubType) => {},
});

export function useClubContext() {
  return useContext(ClubContext);
}

export default function ClubProvider({
  children,
  club: initial,
}: {
  children: any;
  club: ClubType;
}) {
  const { back } = useRouterContext();
  const [club, set] = useState<ClubType>(initial);
  const { user, fetchData } = useUser();
  const { fetchData: fetchEdit } = useAxios<ClubType>({
    url: `/clubs`,
    method: `put`,
    manual: true,
  });

  const setClub = (result: ClubType) => set((club) => ({ ...club, ...result }));

  const action = async (fn: () => Promise<ClubType | null>) => {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.showProgress(true);
    MainButton.disable();
    const result = await fn();
    if (result) setClub(result);
    MainButton.enable();
    MainButton.hideProgress();
  };

  const update = async () =>
    await action(async () => {
      if (!user) return null;
      const res = (await fetchData({
        url: `/clubs`,
        method: `post`,
        data: { _id: initial._id },
      })) as UserType;
      window.Telegram.WebApp.HapticFeedback.notificationOccurred(
        res.member.some(({ _id }) => initial._id == _id) ? `success` : `error`
      );
      return null;
    });

  const edit = (data: ShortClubType) =>
    action(async () => {
      const result = await fetchEdit({ data });
      if (result) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(`success`);
        back();
      }
      return result;
    });

  return (
    <ClubContext.Provider value={{ ...club, update, edit }}>
      {children}
    </ClubContext.Provider>
  );
}
