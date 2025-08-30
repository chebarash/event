import axiosInstance from "@/hooks/axiosInstance";
import { DailyType, EventType, ForYouType } from "@/types/types";
import Calendar from "@/ui/calendar/calendar";
import ForYou from "@/ui/foryou/foryou";
import Greeting from "@/ui/greeting/greeting";
import List from "@/ui/list/list";

export const dynamic = "force-dynamic";

export default async function Home() {
  const {
    data: { events, foryou },
  } = await axiosInstance.get<{
    events: Array<EventType>;
    foryou: ForYouType | null;
  }>(`/`);
  const daily: DailyType = {};
  events.forEach((event) => {
    const day = new Date(event.date).toLocaleDateString("en-US", {
      timeZone: "Etc/GMT-5",
    });
    if (!daily[day]) daily[day] = [];
    daily[day].push(event);
  });
  return (
    <main>
      <Greeting />
      <ForYou foryou={foryou} />
      <Calendar daily={daily} />
      <List daily={daily} />
    </main>
  );
}
