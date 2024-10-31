import { EventType } from "@/app/types/types";
import axios from "axios";
import Image from "next/image";

export default async function Embed() {
  const result = (
    await axios.get<Array<EventType>>(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/event?lte=${new Date().toISOString()}`
    )
  ).data.map(({ date, ...extra }) => ({ date: new Date(date), ...extra }));
  return (
    <main>
      {result.map(({ _id, title, picture, date, author }) => (
        <div key={_id}>
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + picture}
            alt="cover"
            width={160}
            height={90}
            priority
          />
          <p>{title}</p>
          <p>{date.toLocaleString()}</p>
          <p>{`by ${author.name}`}</p>
        </div>
      ))}
    </main>
  );
}
