"use client";

import useUser from "@/hooks/useUser";
import styles from "./page.module.css";
import { useClubContext } from "@/hooks/useClub";
import Loading from "@/ui/loading/loading";
import { notFound } from "next/navigation";
import Image from "next/image";
import { UserType } from "@/types/types";
import useToast from "@/hooks/useToast";

const Member = ({
  _id,
  name,
  picture,
  email,
  id,
  index,
  remove,
}: UserType & {
  index: number;
  remove: (userId: string) => any;
}) => {
  const { toast } = useToast();

  return (
    <li>
      <button
        onClick={() => {
          window.Telegram.WebApp.showConfirm(
            `Are you sure you want to delete ${name}?`,
            async (ok) => {
              if (ok) await remove(_id);
            }
          );
        }}
      >
        <h3>{index}</h3>
        <Image
          unoptimized
          src={picture || `/profile.png`}
          width={46}
          height={46}
          alt="profile"
        />
      </button>
      <div>
        <h3
          onClick={() => {
            window.Telegram.WebApp.openTelegramLink(`https://t.me/@id${id}`);
          }}
        >
          {name}
        </h3>
        <pre
          onClick={() => {
            navigator.clipboard.writeText(`${id}`);
            toast(`Copied to clipboard`);
          }}
        >
          {id}
        </pre>
        <p>{email}</p>
      </div>
    </li>
  );
};

export default function MembersPage() {
  const { user, loading } = useUser();
  const { _id, members, remove } = useClubContext();

  if (!user) return <Loading />;
  if (!loading && !user.clubs.some((c) => c._id == _id)) return notFound();

  return (
    <main>
      <ul className={styles.registered}>
        {members.map((user, i) => (
          <Member key={user._id} {...user} index={i + 1} remove={remove} />
        ))}
      </ul>
    </main>
  );
}
