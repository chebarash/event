import Calendar from "@/ui/calendar/calendar";
import ForYou from "@/ui/foryou/foryou";
import Greeting from "@/ui/greeting/greeting";
import List from "@/ui/list/list";

const data = {
  title: `Chimgan Winter Trip`,
  subtitle: `by Travel Club`,
  button: `Get Ticket`,
  image: `http://event-api.chebarash.uz/photo/AgACAgIAAxkBAAJAAmd0MXNLcZKhUzOELJz-YHhCvqlpAALS5TEb2MmgS46omyRRxvrEAQADAgADeQADNgQ`,
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
