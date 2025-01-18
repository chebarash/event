"use client";

import { ClubType } from "@/types/types";
import { useEffect } from "react";
import Card from "../card/card";

export default function Clubs({
  clubs,
}: {
  clubs: Array<ClubType & { members: number }>;
}) {
  useEffect(() => {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.setParams({
      is_active: false,
      is_visible: false,
    });
  }, []);

  return (
    <main>
      <section>
        {clubs.map((club) => (
          <Card key={club._id} {...club} type="club" />
        ))}
      </section>
    </main>
  );
}
