import Calendar from "@/ui/calendar/calendar";
import ForYou from "@/ui/foryou/foryou";
import Greeting from "@/ui/greeting/greeting";
import List from "@/ui/list/list";

export default function Home() {
  return (
    <main>
      <Greeting />
      <ForYou />
      <Calendar />
      <List />
    </main>
  );
}
