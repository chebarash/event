import Image from "next/image";
import useAxios from "../hooks/useAxios";
import { UserType } from "../types/types";
import styles from "./participants.module.css";

export default function Participants({ _id }: { _id: string }) {
  const { data } = useAxios<Array<UserType>>({
    url: `/participants`,
    method: `get`,
    params: { _id },
  });

  return data?.length && data.length > 0 ? (
    <ol className={styles.perticipants}>
      {data.map(({ _id, name, picture }, i) => (
        <li key={_id}>
          <p className={styles.index}>{i + 1}</p>
          <Image
            src={picture || `/profile.png`}
            width={36}
            height={36}
            alt="picture"
          />
          <p>{name}</p>
        </li>
      ))}
    </ol>
  ) : (
    <></>
  );
}
