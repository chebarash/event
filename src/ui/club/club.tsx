"use client";

import styles from "./club.module.css";
import { ClubType, EventType, UserType } from "@/types/types";
import Image from "next/image";
import ToJsx from "../jsx/jsx";
import Card from "../card/card";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import useEvents from "@/hooks/useEvents";

export default function Club({
  _id,
  cover,
  leader,
  name,
  links,
  description,
  members,
  rank,
  events,
}: ClubType & { members: number; rank: number; events: Array<EventType> }) {
  const tg = links.find(({ text }) => text == `Telegram`);
  const { user, fetchData } = useUser();
  const { events: e } = useEvents();

  useEffect(() => {
    const { MainButton, themeParams, HapticFeedback } = window.Telegram.WebApp;
    const fn = async () => {
      MainButton.showProgress(true);
      MainButton.disable();
      const user = (await fetchData({
        url: `/clubs`,
        method: `post`,
        data: { _id },
      })) as UserType;
      HapticFeedback.notificationOccurred(
        user.member.some((club) => club._id == _id) ? `success` : `error`
      );
      MainButton.enable();
      MainButton.hideProgress();
    };
    if (user) {
      MainButton.setParams({
        is_visible: true,
        is_active: true,
        ...(user.member.some((club) => club._id == _id)
          ? {
              text: `Leave`,
              color: themeParams.section_bg_color,
              text_color: themeParams.text_color,
            }
          : {
              text: `Join`,
              color: themeParams.button_color,
              text_color: themeParams.button_text_color,
            }),
      });
      MainButton.onClick(fn);
    }
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(fn);
    };
  }, [user]);

  return (
    <main>
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + cover}
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
            <h1 className={styles.title}>{name}</h1>
            <p className={styles.author}>by {leader.name}</p>
          </div>
          {tg && (
            <button
              className={styles.share}
              onClick={() => window.Telegram.WebApp.openTelegramLink(tg.url)}
            >
              <svg width="22" height="20" viewBox="0 0 22 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.50631 8.62584C7.41068 5.81226 11.3413 3.94271 13.315 3.0357C18.9326 0.46276 20.1135 0.0185104 20.8726 0C21.0413 0 21.4125 0.037021 21.6655 0.259146C21.8679 0.444249 21.9185 0.684885 21.9523 0.869989C21.986 1.05509 22.0198 1.44381 21.986 1.73998C21.6824 5.25695 20.3665 13.7902 19.6918 17.7144C19.405 19.3804 18.8483 19.9357 18.3084 19.9912C17.1276 20.1023 16.2335 19.1397 15.1032 18.3253C13.315 17.0481 12.3197 16.2521 10.5822 14.9934C8.57468 13.5496 9.87364 12.7537 11.0208 11.4579C11.3244 11.1247 16.5034 5.94183 16.6046 5.47907C16.6215 5.42354 16.6215 5.20142 16.5034 5.09035C16.3853 4.97929 16.2166 5.01631 16.0817 5.05333C15.8961 5.09035 13.062 7.16352 7.54563 11.2543C6.73589 11.8652 6.0105 12.1613 5.35258 12.1428C4.62719 12.1243 3.24388 11.6986 2.19797 11.3283C0.932744 10.8841 -0.0794328 10.6435 0.00491532 9.86603C0.0555242 9.4588 0.561612 9.05157 1.50631 8.62584Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
        <ToJsx>{description}</ToJsx>
      </div>
      <div className={styles.info}>
        <div className={styles.members}>
          <h3>{members}</h3>
          <p>{members === 1 ? "member" : "members"}</p>
        </div>
        <div className={styles.rank}>
          <p>top</p>
          <h3>{rank}</h3>
          {rank == 1 && (
            <svg width="40" height="37" viewBox="0 0 40 37">
              <path
                d="M33.0247 26.5941L35.1489 23.6025L35.1921 23.5416C35.9895 22.4186 36.6458 21.4944 37.0798 20.756C37.4715 20.0895 37.9432 19.1719 37.7787 18.2003C37.6477 17.427 37.2313 16.7097 36.5593 16.2388C36.0853 15.9067 35.5664 15.8173 35.139 15.8113C34.7201 15.8055 34.2889 15.8783 33.8814 15.973C33.0924 16.1561 32.0705 16.5021 30.8525 16.9145L30.7726 16.9416C30.0942 17.1713 29.6863 17.3074 29.3889 17.377C29.3884 17.3645 29.3879 17.3513 29.3876 17.3375C29.3786 17.0098 29.4087 16.5532 29.4614 15.798L29.9933 8.16604C29.9959 8.12888 29.9985 8.09186 30.0011 8.05496C30.0899 6.78219 30.1676 5.6693 30.1089 4.82268C30.0513 3.99243 29.8317 2.83103 28.7404 2.20096C27.6491 1.57089 26.5335 1.96143 25.7857 2.32669C25.0231 2.69916 24.0981 3.32286 23.0403 4.03617C23.0096 4.05684 22.9789 4.07759 22.948 4.0984L16.6045 8.3751C15.9768 8.79825 15.5964 9.05268 15.3082 9.20874C15.296 9.21533 15.2844 9.22153 15.2733 9.22735C15.1849 8.93504 15.0988 8.51366 14.9585 7.81135L14.942 7.72862C14.6901 6.46756 14.4788 5.40955 14.243 4.63471C14.1212 4.23449 13.9686 3.82467 13.7541 3.46476C13.5353 3.09762 13.1984 2.69291 12.6738 2.44851C11.93 2.10195 11.1006 2.10001 10.3654 2.37325C9.44166 2.71654 8.88287 3.58384 8.50152 4.25638C8.07906 5.00142 7.60683 6.03181 7.03297 7.28392L7.00186 7.35181L5.47316 10.6872L5.43387 10.7729C4.20774 13.4481 3.23392 15.5727 2.65627 17.335C2.06436 19.1407 1.81852 20.7612 2.23419 22.3861C2.65768 24.0415 3.6503 25.2454 5.0345 26.3393C6.35049 27.3794 8.15636 28.422 10.3739 29.7022L10.4738 29.7599L14.007 31.7997L14.1068 31.8574C16.3243 33.1377 18.1302 34.1804 19.6889 34.8C21.3284 35.4518 22.8673 35.7095 24.5127 35.2485C26.1276 34.7961 27.4081 33.773 28.676 32.3575C29.9133 30.9761 31.2664 29.0704 32.9701 26.671L33.0247 26.5941Z"
                fill="var(--accent)"
                stroke="var(--bg)"
                strokeWidth="4"
              />
            </svg>
          )}
        </div>
      </div>
      {events.map((event) => (
        <Card key={event._id} {...event} includeDate disabled={!e[event._id]} />
      ))}
    </main>
  );
}
