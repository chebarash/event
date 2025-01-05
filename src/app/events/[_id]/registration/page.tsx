"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useEventContext } from "@/hooks/useEvent";
import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserType } from "@/types/types";
import useAxios from "@/hooks/useAxios";

const Participant = ({
  name,
  picture,
  email,
  id,
  participated,
}: UserType & { participated?: boolean }) => {
  const { toast } = useToast();

  return (
    <li>
      <Image
        src={picture || `/profile.png`}
        width={40}
        height={40}
        alt="profile"
      />
      <div>
        <h3>{name}</h3>
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
      {participated && (
        <svg className={styles.star} width="60" viewBox="0 0 52 48" fill="none">
          <path
            d="M41.162 7.08965L40.0403 5.0664L38.2005 6.46879L34.0049 9.66681L34.6221 4.22542L34.8745 2H32.6348H19.3652H17.1255L17.3779 4.22543L17.9951 9.66681L13.7995 6.46879L11.9597 5.0664L10.838 7.08965L4.25084 18.9708L3.19873 20.8685L5.17569 21.7628L10.1212 24L5.17569 26.2372L3.19873 27.1315L4.25084 29.0292L10.838 40.9104L11.9597 42.9336L13.7995 41.5312L17.9951 38.3332L17.3779 43.7746L17.1255 46H19.3652H32.6348H34.8745L34.6221 43.7746L34.0049 38.3332L38.2005 41.5312L40.0403 42.9336L41.162 40.9104L47.7492 29.0292L48.8013 27.1315L46.8243 26.2372L41.8788 24L46.8243 21.7628L48.8013 20.8685L47.7492 18.9708L41.162 7.08965Z"
            fill="var(--accent)"
            stroke="var(--bg)"
            strokeWidth="4"
          />
        </svg>
      )}
    </li>
  );
};

export default function RegistrationPage() {
  const { user, loading } = useUser();
  const { _id, date, deadline, author, registered, participated, participate } =
    useEventContext();
  const { fetchData } = useAxios({
    url: `/registered?_id=${_id}`,
    method: `get`,
    manual: true,
  });

  const timeTillEvent = date.getTime() - new Date().getTime();
  const timeTillDeadline = deadline
    ? deadline.getTime() - new Date().getTime()
    : 1;

  const canRegister = timeTillEvent > 0 && timeTillDeadline > 0;

  const fn = () => {
    const { showScanQrPopup, closeScanQrPopup } = window.Telegram.WebApp;
    showScanQrPopup(
      {
        text: "Scan Ticket",
      },
      async (data) => {
        await participate(data);
        closeScanQrPopup();
      }
    );
  };

  const scFn = async () => {
    const { SecondaryButton } = window.Telegram.WebApp;
    SecondaryButton.showProgress();
    await fetchData();
    SecondaryButton.hideProgress();
  };

  useEffect(() => {
    const { MainButton, SecondaryButton, themeParams } = window.Telegram.WebApp;
    if (user && user.clubs.some(({ _id }) => _id == author._id)) {
      if (!canRegister) fn();
      MainButton.setParams({
        is_active: true,
        is_visible: true,
        text: `Scan Ticket`,
        color: themeParams.button_color,
        text_color: themeParams.button_text_color,
      });
      SecondaryButton.setParams({
        is_active: true,
        is_visible: true,
        text: `Get List`,
        color: themeParams.button_color,
        text_color: themeParams.button_text_color,
      });
      MainButton.onClick(fn);
      SecondaryButton.onClick(scFn);
    }
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      SecondaryButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(fn);
      SecondaryButton.offClick(scFn);
    };
  }, [user]);

  if (!loading && !user?.clubs.some(({ _id }) => _id == author._id))
    return notFound();

  return (
    <main>
      <ul className={styles.registered}>
        {participated.map((user) => (
          <Participant key={user._id} participated {...user} />
        ))}
        {registered
          .filter(
            ({ _id }) => !participated.map(({ _id }) => _id).includes(_id)
          )
          .map((user) => (
            <Participant key={user._id} {...user} />
          ))}
      </ul>
    </main>
  );
}
