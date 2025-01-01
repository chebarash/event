"use client";

import styles from "./event.module.css";
import { EventType } from "@/types/types";
import Image from "next/image";
import { useEffect } from "react";
import ToJsx from "../jsx/jsx";
import useEvents from "@/hooks/useEvents";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const getTimeRemaining = (endtime: Date): [number | string, string] => {
  const total = endtime.getTime() - Date.now();
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const list: Array<[number, string]> = [
    [days, days > 1 ? `days` : `day`],
    [hours, hours > 1 ? `hours` : `hour`],
    [minutes, minutes > 1 ? `minutes` : `minute`],
  ];
  return list.filter(([t]) => t > 0)[0] || [`deadline`, `has passed`];
};

export default function Event({
  _id,
  title,
  picture,
  description,
  author,
  date,
  venue,
  duration,
  shares,
  registered,
  participated,
  hashtags,
  spots,
  deadline,
  external,
  private: prvt,
  cancelled,
  registration,
}: EventType & { registration?: boolean }) {
  const router = useRouter();
  const { update } = useEvents();
  const { user } = useUser();

  const day = [
    date.toLocaleDateString(`en`, { month: `long` }),
    date.getDate().toString(),
  ];
  const time = date.toLocaleString(`en`, { timeStyle: `short` }).split(` `);
  const hours = duration / (1000 * 60 * 60);

  const timeLeft = deadline ? getTimeRemaining(deadline) : undefined;
  const spotsLeft = spots ? spots - registered.length : undefined;

  const timeTillEvent = date.getTime() - new Date().getTime();
  const timeTillDeadline = deadline
    ? deadline.getTime() - new Date().getTime()
    : 1;

  const canRegister =
    timeTillEvent > 0 &&
    timeTillDeadline > 0 &&
    !cancelled &&
    (!spots || registration || spots - registered.length > 0);

  const fn = () => {
    if (!canRegister && user) return router.push(`/tickets/${_id}`);
    if (!user) {
      window.Telegram.WebApp.openLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth?id=${
          window.Telegram.WebApp.initDataUnsafe.user?.id
        }&from=${encodeURIComponent(
          `${process.env.NEXT_PUBLIC_APP_URL}?startapp=${_id}`
        )}`
      );
      return window.Telegram.WebApp.close();
    }
    update(_id);
    if (external && !registration)
      if (external.startsWith(`https://t.me/`))
        window.Telegram.WebApp.openTelegramLink(external);
      else window.Telegram.WebApp.openLink(external);
  };

  const fnSc = () => router.push(`/admin/${_id}`);

  useEffect(() => {
    const {
      MainButton,
      SecondaryButton,
      themeParams,
      requestWriteAccess,
      initDataUnsafe,
    } = window.Telegram.WebApp;
    if (initDataUnsafe.user && !initDataUnsafe.user.allows_write_to_pm)
      requestWriteAccess();
    if (
      user &&
      (user.clubs.map(({ _id }) => _id).includes(author._id) ||
        user._id == author._id)
    ) {
      SecondaryButton.setParams({
        is_active: true,
        is_visible: true,
        text: `Edit`,
        color: themeParams.section_bg_color,
        text_color: themeParams.text_color,
      });
      SecondaryButton.onClick(fnSc);
    }
    MainButton.onClick(fn);
    MainButton.setParams({
      is_active: true,
      is_visible: true,
      ...(canRegister
        ? registration
          ? {
              text: `Unregister`,
              color: themeParams.section_bg_color,
              text_color: themeParams.text_color,
            }
          : {
              text: `Register`,
              color: themeParams.button_color,
              text_color: themeParams.button_text_color,
            }
        : {
            text: `Get Ticket`,
            color: themeParams.button_color,
            text_color: themeParams.button_text_color,
          }),
    });
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(fn);
      SecondaryButton.setParams({
        is_active: false,
        is_visible: false,
      });
      SecondaryButton.offClick(fnSc);
    };
  }, [registration, _id, external, update, user]);

  return (
    <main
      id={_id}
      className={[
        styles.event,
        cancelled ? styles.cancelled : ``,
        prvt ? styles.private : ``,
      ].join(` `)}
    >
      {registration && (
        <svg className={styles.star} width="60" viewBox="0 0 52 48" fill="none">
          <path
            d="M41.162 7.08965L40.0403 5.0664L38.2005 6.46879L34.0049 9.66681L34.6221 4.22542L34.8745 2H32.6348H19.3652H17.1255L17.3779 4.22543L17.9951 9.66681L13.7995 6.46879L11.9597 5.0664L10.838 7.08965L4.25084 18.9708L3.19873 20.8685L5.17569 21.7628L10.1212 24L5.17569 26.2372L3.19873 27.1315L4.25084 29.0292L10.838 40.9104L11.9597 42.9336L13.7995 41.5312L17.9951 38.3332L17.3779 43.7746L17.1255 46H19.3652H32.6348H34.8745L34.6221 43.7746L34.0049 38.3332L38.2005 41.5312L40.0403 42.9336L41.162 40.9104L47.7492 29.0292L48.8013 27.1315L46.8243 26.2372L41.8788 24L46.8243 21.7628L48.8013 20.8685L47.7492 18.9708L41.162 7.08965Z"
            fill="var(--accent)"
            stroke="var(--bg)"
            strokeWidth="4"
          />
        </svg>
      )}
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + picture}
        alt="cover"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
        className={styles.cover}
      />
      <div className={styles.box}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.author}>
              <p>by</p>
              <Image
                src={
                  "picture" in author
                    ? author.picture || `/profile.png`
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/photo/${
                        (author as any).cover
                      }`
                }
                width={40}
                height={40}
                alt="picture"
              />
              <p>{author.name}</p>
            </div>
          </div>
          <button
            className={styles.share}
            onClick={() =>
              window.Telegram.WebApp.switchInlineQuery(title, [
                `channels`,
                `groups`,
                `users`,
              ])
            }
          >
            <p>{shares}</p>
            <svg width="20" height="21" viewBox="0 0 20 21">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.0003 0.5H20.0003V19.5H16.0003V7.32843L3.0003 20.3284L0.171875 17.5L13.1719 4.5H1.0003V0.5Z"
                fill="var(--bg)"
              />
            </svg>
          </button>
        </div>
        <ToJsx>{description}</ToJsx>
      </div>
      <div className={styles.info}>
        <div className={styles.day}>
          <p>{day[0]}</p>
          <h3>{day[1]}</h3>
        </div>
        <div className={styles.time}>
          <h3>{time[0]}</h3>
          <p>{time[1]}</p>
        </div>
        <div className={styles.venue}>
          <p>{venue}</p>
        </div>
        <div className={styles.duration}>
          <h3>{hours}</h3> <p>{hours == 1 ? `hour` : `hours`}</p>
        </div>
      </div>
      {timeTillEvent > 0 &&
        (timeLeft || spotsLeft != undefined || registration) && (
          <div className={styles.footer}>
            {registration && <p>event added to your calendar</p>}
            {spotsLeft != undefined && !registration && (
              <div>
                <h3>
                  {spotsLeft > 1 ? spotsLeft : spotsLeft < 1 ? `NO` : `LAST`}
                </h3>
                <p>{spotsLeft == 1 ? `spot left` : `spots left`}</p>
              </div>
            )}
            {timeLeft && !registration && (
              <div>
                {typeof timeLeft[0] == `number` && <p>deadline in</p>}
                <h3>{timeLeft[0]}</h3>
                <p>{timeLeft[1]}</p>
              </div>
            )}
          </div>
        )}
    </main>
  );
}
