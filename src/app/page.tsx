import Calendar from "@/ui/calendar/calendar";
import ForYou from "@/ui/foryou/foryou";
import Greeting from "@/ui/greeting/greeting";
import List from "@/ui/list/list";

const data = {
  title: `Samarkand trip`,
  subtitle: `by Travel Club`,
  button: `Get Ticket`,
  image: `http://event-api.chebarash.uz/photo/AgACAgIAAxkBAAI_-GdztNRpEgO5GCL6lJ0UhYbnO8_2AAJl4TEb2MmgSzZvX5SXKTE-AQADAgADdwADNgQ`,
  link: `/events/6763c2141438c4cd016b4c60`,
};

export default function Home() {
  return (
    <main>
      <Greeting />
      {data && <ForYou {...data} />}
      <Calendar />
      <List />
    </main>
  );
}
