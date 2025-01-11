"use client";

import { useSearchParams } from "next/navigation";
import { DailyType } from "@/types/types";
import styles from "./list.module.css";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import Card from "../card/card";
import { useRouterContext } from "@/hooks/useRouter";

export default function List({ daily }: { daily: DailyType }) {
  const { push } = useRouterContext();
  const day = useSearchParams().get(`day`);
  const { user } = useUser();
  const date = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * parseInt(day || `0`)
  ).toLocaleDateString("en-US", {
    timeZone: "Etc/GMT-5",
  });
  const events = daily[date]?.filter(
    ({ author: { _id }, private: p }) =>
      (user && user.member.some((c) => c._id === _id)) || !p
  );

  useEffect(() => {
    const { MainButton, SecondaryButton, themeParams } = window.Telegram.WebApp;
    MainButton.setParams({
      is_active: false,
      is_visible: false,
    });
    const fnSc = push(`/events/create`);
    if (user?.clubs.length) {
      SecondaryButton.setParams({
        is_active: true,
        is_visible: true,
        text: `Create`,
        color: themeParams.section_bg_color,
        text_color: themeParams.text_color,
      });
      SecondaryButton.onClick(fnSc);
    }
    return () => {
      SecondaryButton.setParams({
        is_active: false,
        is_visible: false,
      });
      SecondaryButton.offClick(fnSc);
    };
  }, [user]);

  return (
    <div className={styles.list}>
      {events?.length ? (
        events.map((event) => (
          <Card
            {...event}
            key={event._id}
            registration={event.registered.some(({ _id }) => _id === user?._id)}
          />
        ))
      ) : (
        <svg width="306" height="75" viewBox="0 0 306 75" fill="none">
          <path
            d="M21.096 12.6C20.984 15.304 20.928 18.2 20.928 21.288C20.928 24.392 20.984 27.296 21.096 30H12.504L6.696 16.896L7.128 30H0.96C1.088 26.896 1.152 23.992 1.152 21.288C1.152 18.6 1.088 15.704 0.96 12.6H9.792L15.624 26.064L15.216 12.6H21.096ZM33.6947 30.24C30.0307 30.24 27.3347 29.448 25.6067 27.864C23.8787 26.264 23.0147 24.024 23.0147 21.144C23.0147 18.296 23.8707 16.072 25.5827 14.472C27.3107 12.872 30.0147 12.072 33.6947 12.072C37.3907 12.072 40.0947 12.872 41.8067 14.472C43.5347 16.072 44.3987 18.296 44.3987 21.144C44.3987 24.04 43.5427 26.28 41.8307 27.864C40.1187 29.448 37.4067 30.24 33.6947 30.24ZM33.6947 25.344C35.4707 25.344 36.7507 25.008 37.5347 24.336C38.3187 23.648 38.7107 22.584 38.7107 21.144C38.7107 19.736 38.3187 18.688 37.5347 18C36.7507 17.312 35.4707 16.968 33.6947 16.968C31.9347 16.968 30.6627 17.312 29.8787 18C29.0947 18.688 28.7027 19.736 28.7027 21.144C28.7027 22.568 29.0947 23.624 29.8787 24.312C30.6627 25 31.9347 25.344 33.6947 25.344ZM56.7803 25.608C62.8603 25.576 67.2683 25.488 70.0043 25.344C69.8923 26 69.8203 26.68 69.7883 27.384C69.7723 28.072 69.7643 28.944 69.7643 30H51.1163C51.2443 26.896 51.3083 23.992 51.3083 21.288C51.3083 18.584 51.2443 15.68 51.1163 12.576H69.7643V16.92H56.7803V19.224C57.5483 19.24 58.6843 19.248 60.1883 19.248C62.7323 19.248 65.3643 19.2 68.0843 19.104V23.232C65.3643 23.136 62.7323 23.088 60.1883 23.088C58.6843 23.088 57.5483 23.096 56.7803 23.112V25.608ZM91.1334 12.576L89.5494 16.248C88.1574 19.496 87.0614 22.096 86.2614 24.048C85.4614 26 84.7254 27.984 84.0534 30H76.8774C76.2214 28.016 75.4934 26.056 74.6934 24.12C73.9094 22.168 72.8534 19.672 71.5254 16.632C71.3014 16.12 70.7174 14.768 69.7734 12.576H76.4454C76.9254 14.128 77.6374 16.12 78.5814 18.552C79.4134 20.696 80.0854 22.552 80.5974 24.12C80.9334 23.016 81.3334 21.84 81.7974 20.592C82.2774 19.328 82.5654 18.56 82.6614 18.288C83.5894 15.84 84.2694 13.936 84.7014 12.576H91.1334ZM98.0771 25.608C104.157 25.576 108.565 25.488 111.301 25.344C111.189 26 111.117 26.68 111.085 27.384C111.069 28.072 111.061 28.944 111.061 30H92.4131C92.5411 26.896 92.6051 23.992 92.6051 21.288C92.6051 18.584 92.5411 15.68 92.4131 12.576H111.061V16.92H98.0771V19.224C98.8451 19.24 99.9811 19.248 101.485 19.248C104.029 19.248 106.661 19.2 109.381 19.104V23.232C106.661 23.136 104.029 23.088 101.485 23.088C99.9811 23.088 98.8451 23.096 98.0771 23.112V25.608ZM133.362 12.6C133.25 15.304 133.194 18.2 133.194 21.288C133.194 24.392 133.25 27.296 133.362 30H124.77L118.962 16.896L119.394 30H113.226C113.354 26.896 113.418 23.992 113.418 21.288C113.418 18.6 113.354 15.704 113.226 12.6H122.058L127.89 26.064L127.482 12.6H133.362ZM155.896 17.616C153.384 17.536 150.944 17.488 148.576 17.472V30H142.576V17.472C140.192 17.488 137.76 17.536 135.28 17.616V12.576H155.896V17.616ZM157.827 27.936C158.371 27.12 158.819 26.36 159.171 25.656C159.539 24.952 159.891 24.136 160.227 23.208C161.363 23.864 162.683 24.376 164.187 24.744C165.691 25.112 167.091 25.296 168.387 25.296C169.715 25.296 170.651 25.184 171.195 24.96C171.739 24.72 172.011 24.464 172.011 24.192C172.011 23.216 170.523 22.728 167.547 22.728C164.283 22.728 161.915 22.392 160.443 21.72C158.971 21.032 158.235 19.928 158.235 18.408C158.235 16.248 159.131 14.656 160.923 13.632C162.715 12.608 165.043 12.096 167.907 12.096C169.571 12.096 171.275 12.312 173.019 12.744C174.779 13.16 176.363 13.736 177.771 14.472C177.307 15.528 176.819 16.816 176.307 18.336C176.211 18.656 176.131 18.896 176.067 19.056C175.251 18.4 174.019 17.856 172.371 17.424C170.723 16.976 169.267 16.752 168.003 16.752C166.483 16.752 165.459 16.856 164.931 17.064C164.403 17.256 164.139 17.544 164.139 17.928C164.139 18.312 164.499 18.624 165.219 18.864C165.955 19.088 167.011 19.2 168.387 19.2C171.779 19.2 174.243 19.592 175.779 20.376C177.315 21.144 178.083 22.328 178.083 23.928C178.083 26.168 177.267 27.784 175.635 28.776C174.003 29.752 171.531 30.24 168.219 30.24C166.443 30.24 164.635 30.048 162.795 29.664C160.955 29.264 159.299 28.688 157.827 27.936ZM205.42 17.616C202.908 17.536 200.468 17.488 198.1 17.472V30H192.1V17.472C189.716 17.488 187.284 17.536 184.804 17.616V12.576H205.42V17.616ZM216.601 30.24C212.937 30.24 210.241 29.448 208.513 27.864C206.785 26.264 205.921 24.024 205.921 21.144C205.921 18.296 206.777 16.072 208.489 14.472C210.217 12.872 212.921 12.072 216.601 12.072C220.297 12.072 223.001 12.872 224.713 14.472C226.441 16.072 227.305 18.296 227.305 21.144C227.305 24.04 226.449 26.28 224.737 27.864C223.025 29.448 220.313 30.24 216.601 30.24ZM216.601 25.344C218.377 25.344 219.657 25.008 220.441 24.336C221.225 23.648 221.617 22.584 221.617 21.144C221.617 19.736 221.225 18.688 220.441 18C219.657 17.312 218.377 16.968 216.601 16.968C214.841 16.968 213.569 17.312 212.785 18C212.001 18.688 211.609 19.736 211.609 21.144C211.609 22.568 212.001 23.624 212.785 24.312C213.569 25 214.841 25.344 216.601 25.344ZM236.898 12.312C239.906 12.312 242.282 12.68 244.026 13.416C245.77 14.136 246.986 15.144 247.674 16.44C248.378 17.72 248.73 19.296 248.73 21.168C248.73 22.944 248.33 24.496 247.53 25.824C246.73 27.152 245.53 28.184 243.93 28.92C242.33 29.64 240.362 30 238.026 30C236.602 30 235.154 30 233.682 30C232.21 30 230.722 29.992 229.218 29.976C229.346 26.824 229.41 23.888 229.41 21.168C229.41 18.416 229.346 15.544 229.218 12.552C231.122 12.392 233.682 12.312 236.898 12.312ZM238.698 25.224C240.186 25.224 241.178 24.864 241.674 24.144C242.17 23.424 242.418 22.432 242.418 21.168C242.418 19.952 242.154 18.968 241.626 18.216C241.114 17.464 240.138 17.088 238.698 17.088C237.146 17.088 235.986 17.136 235.218 17.232V25.224H238.698ZM264.354 30C264.05 29.088 263.642 27.944 263.13 26.568H255.474L254.274 30H248.25L254.97 12.576H263.802L270.57 30H264.354ZM261.762 22.824C261.154 21.144 260.53 19.464 259.89 17.784L259.314 16.224C258.754 17.68 257.93 19.88 256.842 22.824H261.762ZM291.781 12.576L291.325 13.272C289.613 15.928 288.141 18.28 286.909 20.328C285.693 22.36 284.677 24.232 283.861 25.944V30H277.597V25.536C277.005 24.336 276.309 23.104 275.509 21.84C274.709 20.56 273.573 18.808 272.101 16.584C270.949 14.888 270.069 13.552 269.461 12.576H276.181C276.661 13.552 277.445 15 278.533 16.92C279.621 18.872 280.365 20.248 280.765 21.048C281.325 19.88 282.077 18.448 283.021 16.752C284.125 14.768 284.869 13.376 285.253 12.576H291.781Z"
            fill="var(--fg)"
          />
          <path
            d="M5.096 46.166L3.164 47.258V47.034L5.096 48.126L4.774 48.714L2.87 47.608L3.024 47.538V49.68H2.38L2.394 47.538L2.534 47.608L0.644 48.714L0.308 48.126L2.254 47.034V47.258L0.308 46.166L0.644 45.578L2.534 46.684L2.394 46.754L2.38 44.612H3.024V46.754L2.87 46.684L4.774 45.578L5.096 46.166ZM10.5804 55.07C9.93639 55.07 9.35772 54.9253 8.84439 54.636C8.33106 54.3373 7.92506 53.908 7.62639 53.348C7.32772 52.788 7.17839 52.1113 7.17839 51.318C7.17839 50.5153 7.32772 49.8387 7.62639 49.288C7.93439 48.728 8.34506 48.3033 8.85839 48.014C9.37172 47.7247 9.94572 47.58 10.5804 47.58C11.2804 47.58 11.9057 47.7387 12.4564 48.056C13.0164 48.364 13.4551 48.798 13.7724 49.358C14.0897 49.918 14.2484 50.5713 14.2484 51.318C14.2484 52.0553 14.0897 52.7087 13.7724 53.278C13.4551 53.838 13.0164 54.2767 12.4564 54.594C11.9057 54.9113 11.2804 55.07 10.5804 55.07ZM6.78639 55V44.612H7.78039V49.82L7.64039 51.304L7.73839 52.788V55H6.78639ZM10.5104 54.188C11.0331 54.188 11.4997 54.0713 11.9104 53.838C12.3211 53.5953 12.6477 53.2593 12.8904 52.83C13.1331 52.3913 13.2544 51.8873 13.2544 51.318C13.2544 50.7393 13.1331 50.2353 12.8904 49.806C12.6477 49.3767 12.3211 49.0453 11.9104 48.812C11.4997 48.5693 11.0331 48.448 10.5104 48.448C9.98772 48.448 9.51639 48.5693 9.09639 48.812C8.68572 49.0453 8.35906 49.3767 8.11639 49.806C7.88306 50.2353 7.76639 50.7393 7.76639 51.318C7.76639 51.8873 7.88306 52.3913 8.11639 52.83C8.35906 53.2593 8.68572 53.5953 9.09639 53.838C9.51639 54.0713 9.98772 54.188 10.5104 54.188ZM19.3127 55.07C18.6873 55.07 18.1413 54.9533 17.6747 54.72C17.208 54.4867 16.844 54.1367 16.5827 53.67C16.3307 53.2033 16.2047 52.62 16.2047 51.92V47.65H17.1987V51.808C17.1987 52.592 17.39 53.1847 17.7727 53.586C18.1647 53.978 18.7107 54.174 19.4107 54.174C19.924 54.174 20.3673 54.0713 20.7407 53.866C21.1233 53.6513 21.4127 53.3433 21.6087 52.942C21.814 52.5407 21.9167 52.06 21.9167 51.5V47.65H22.9107V55H21.9587V52.984L22.1127 53.348C21.8793 53.8893 21.5153 54.314 21.0207 54.622C20.5353 54.9207 19.966 55.07 19.3127 55.07ZM28.0049 55.07C27.3143 55.07 26.7823 54.8833 26.4089 54.51C26.0356 54.1367 25.8489 53.6093 25.8489 52.928V46.026H26.8429V52.872C26.8429 53.3013 26.9503 53.6327 27.1649 53.866C27.3889 54.0993 27.7063 54.216 28.1169 54.216C28.5556 54.216 28.9196 54.09 29.2089 53.838L29.5589 54.552C29.3629 54.7293 29.1249 54.86 28.8449 54.944C28.5743 55.028 28.2943 55.07 28.0049 55.07ZM24.5329 48.476V47.65H29.0829V48.476H24.5329ZM37.3565 55.07C36.6658 55.07 36.1338 54.8833 35.7605 54.51C35.3872 54.1367 35.2005 53.6093 35.2005 52.928V46.026H36.1945V52.872C36.1945 53.3013 36.3018 53.6327 36.5165 53.866C36.7405 54.0993 37.0578 54.216 37.4685 54.216C37.9072 54.216 38.2712 54.09 38.5605 53.838L38.9105 54.552C38.7145 54.7293 38.4765 54.86 38.1965 54.944C37.9258 55.028 37.6458 55.07 37.3565 55.07ZM33.8845 48.476V47.65H38.4345V48.476H33.8845ZM43.4562 55.07C42.7469 55.07 42.1076 54.9113 41.5382 54.594C40.9782 54.2673 40.5349 53.824 40.2082 53.264C39.8816 52.6947 39.7182 52.046 39.7182 51.318C39.7182 50.5807 39.8816 49.932 40.2082 49.372C40.5349 48.812 40.9782 48.3733 41.5382 48.056C42.0982 47.7387 42.7376 47.58 43.4562 47.58C44.1842 47.58 44.8282 47.7387 45.3882 48.056C45.9576 48.3733 46.4009 48.812 46.7182 49.372C47.0449 49.932 47.2082 50.5807 47.2082 51.318C47.2082 52.046 47.0449 52.6947 46.7182 53.264C46.4009 53.824 45.9576 54.2673 45.3882 54.594C44.8189 54.9113 44.1749 55.07 43.4562 55.07ZM43.4562 54.188C43.9882 54.188 44.4596 54.0713 44.8702 53.838C45.2809 53.5953 45.6029 53.2593 45.8362 52.83C46.0789 52.3913 46.2002 51.8873 46.2002 51.318C46.2002 50.7393 46.0789 50.2353 45.8362 49.806C45.6029 49.3767 45.2809 49.0453 44.8702 48.812C44.4596 48.5693 43.9929 48.448 43.4702 48.448C42.9476 48.448 42.4809 48.5693 42.0702 48.812C41.6596 49.0453 41.3329 49.3767 41.0902 49.806C40.8476 50.2353 40.7262 50.7393 40.7262 51.318C40.7262 51.8873 40.8476 52.3913 41.0902 52.83C41.3329 53.2593 41.6596 53.5953 42.0702 53.838C42.4809 54.0713 42.9429 54.188 43.4562 54.188ZM58.4216 47.58C59.0189 47.58 59.5369 47.6967 59.9756 47.93C60.4236 48.154 60.7689 48.4993 61.0116 48.966C61.2636 49.4327 61.3896 50.0207 61.3896 50.73V55H60.3956V50.828C60.3956 50.0533 60.2089 49.47 59.8356 49.078C59.4716 48.6767 58.9536 48.476 58.2816 48.476C57.7776 48.476 57.3389 48.5833 56.9656 48.798C56.6016 49.0033 56.3169 49.3067 56.1116 49.708C55.9156 50.1 55.8176 50.576 55.8176 51.136V55H54.8236V50.828C54.8236 50.0533 54.6369 49.47 54.2636 49.078C53.8902 48.6767 53.3676 48.476 52.6956 48.476C52.2009 48.476 51.7669 48.5833 51.3936 48.798C51.0202 49.0033 50.7309 49.3067 50.5256 49.708C50.3296 50.1 50.2316 50.576 50.2316 51.136V55H49.2376V47.65H50.1896V49.638L50.0356 49.288C50.2596 48.756 50.6189 48.3407 51.1136 48.042C51.6176 47.734 52.2102 47.58 52.8916 47.58C53.6102 47.58 54.2216 47.762 54.7256 48.126C55.2296 48.4807 55.5562 49.0173 55.7056 49.736L55.3136 49.582C55.5282 48.9847 55.9062 48.504 56.4476 48.14C56.9982 47.7667 57.6562 47.58 58.4216 47.58ZM67.0812 55.07C66.3719 55.07 65.7326 54.9113 65.1632 54.594C64.6032 54.2673 64.1599 53.824 63.8332 53.264C63.5066 52.6947 63.3432 52.046 63.3432 51.318C63.3432 50.5807 63.5066 49.932 63.8332 49.372C64.1599 48.812 64.6032 48.3733 65.1632 48.056C65.7232 47.7387 66.3626 47.58 67.0812 47.58C67.8092 47.58 68.4532 47.7387 69.0132 48.056C69.5826 48.3733 70.0259 48.812 70.3432 49.372C70.6699 49.932 70.8332 50.5807 70.8332 51.318C70.8332 52.046 70.6699 52.6947 70.3432 53.264C70.0259 53.824 69.5826 54.2673 69.0132 54.594C68.4439 54.9113 67.7999 55.07 67.0812 55.07ZM67.0812 54.188C67.6132 54.188 68.0846 54.0713 68.4952 53.838C68.9059 53.5953 69.2279 53.2593 69.4612 52.83C69.7039 52.3913 69.8252 51.8873 69.8252 51.318C69.8252 50.7393 69.7039 50.2353 69.4612 49.806C69.2279 49.3767 68.9059 49.0453 68.4952 48.812C68.0846 48.5693 67.6179 48.448 67.0952 48.448C66.5726 48.448 66.1059 48.5693 65.6952 48.812C65.2846 49.0453 64.9579 49.3767 64.7152 49.806C64.4726 50.2353 64.3512 50.7393 64.3512 51.318C64.3512 51.8873 64.4726 52.3913 64.7152 52.83C64.9579 53.2593 65.2846 53.5953 65.6952 53.838C66.1059 54.0713 66.5679 54.188 67.0812 54.188ZM72.8626 55V47.65H73.8146V49.652L73.7166 49.302C73.9219 48.742 74.2672 48.3173 74.7526 48.028C75.2379 47.7293 75.8399 47.58 76.5586 47.58V48.546C76.5212 48.546 76.4839 48.546 76.4466 48.546C76.4092 48.5367 76.3719 48.532 76.3346 48.532C75.5599 48.532 74.9532 48.77 74.5146 49.246C74.0759 49.7127 73.8566 50.38 73.8566 51.248V55H72.8626ZM78.3723 55V47.65H79.3243V49.652L79.2263 49.302C79.4317 48.742 79.777 48.3173 80.2623 48.028C80.7477 47.7293 81.3497 47.58 82.0683 47.58V48.546C82.031 48.546 81.9937 48.546 81.9563 48.546C81.919 48.5367 81.8817 48.532 81.8443 48.532C81.0697 48.532 80.463 48.77 80.0243 49.246C79.5857 49.7127 79.3663 50.38 79.3663 51.248V55H78.3723ZM86.8097 55.07C86.1004 55.07 85.4611 54.9113 84.8917 54.594C84.3317 54.2673 83.8884 53.824 83.5617 53.264C83.2351 52.6947 83.0717 52.046 83.0717 51.318C83.0717 50.5807 83.2351 49.932 83.5617 49.372C83.8884 48.812 84.3317 48.3733 84.8917 48.056C85.4517 47.7387 86.0911 47.58 86.8097 47.58C87.5377 47.58 88.1817 47.7387 88.7417 48.056C89.3111 48.3733 89.7544 48.812 90.0717 49.372C90.3984 49.932 90.5617 50.5807 90.5617 51.318C90.5617 52.046 90.3984 52.6947 90.0717 53.264C89.7544 53.824 89.3111 54.2673 88.7417 54.594C88.1724 54.9113 87.5284 55.07 86.8097 55.07ZM86.8097 54.188C87.3417 54.188 87.8131 54.0713 88.2237 53.838C88.6344 53.5953 88.9564 53.2593 89.1897 52.83C89.4324 52.3913 89.5537 51.8873 89.5537 51.318C89.5537 50.7393 89.4324 50.2353 89.1897 49.806C88.9564 49.3767 88.6344 49.0453 88.2237 48.812C87.8131 48.5693 87.3464 48.448 86.8237 48.448C86.3011 48.448 85.8344 48.5693 85.4237 48.812C85.0131 49.0453 84.6864 49.3767 84.4437 49.806C84.2011 50.2353 84.0797 50.7393 84.0797 51.318C84.0797 51.8873 84.2011 52.3913 84.4437 52.83C84.6864 53.2593 85.0131 53.5953 85.4237 53.838C85.8344 54.0713 86.2964 54.188 86.8097 54.188ZM93.884 55L91.112 47.65H92.064L94.584 54.468H94.15L96.74 47.65H97.594L100.156 54.468H99.722L102.284 47.65H103.194L100.408 55H99.47L97.006 48.588H97.3L94.822 55H93.884ZM110.679 55.07C109.988 55.07 109.456 54.8833 109.083 54.51C108.709 54.1367 108.523 53.6093 108.523 52.928V46.026H109.517V52.872C109.517 53.3013 109.624 53.6327 109.839 53.866C110.063 54.0993 110.38 54.216 110.791 54.216C111.229 54.216 111.593 54.09 111.883 53.838L112.233 54.552C112.037 54.7293 111.799 54.86 111.519 54.944C111.248 55.028 110.968 55.07 110.679 55.07ZM107.207 48.476V47.65H111.757V48.476H107.207ZM117.794 47.58C118.392 47.58 118.914 47.6967 119.362 47.93C119.82 48.154 120.174 48.4993 120.426 48.966C120.688 49.4327 120.818 50.0207 120.818 50.73V55H119.824V50.828C119.824 50.0533 119.628 49.47 119.236 49.078C118.854 48.6767 118.312 48.476 117.612 48.476C117.09 48.476 116.632 48.5833 116.24 48.798C115.858 49.0033 115.559 49.3067 115.344 49.708C115.139 50.1 115.036 50.576 115.036 51.136V55H114.042V44.612H115.036V49.666L114.84 49.288C115.074 48.756 115.447 48.3407 115.96 48.042C116.474 47.734 117.085 47.58 117.794 47.58ZM126.625 55.07C125.86 55.07 125.188 54.9113 124.609 54.594C124.031 54.2673 123.578 53.824 123.251 53.264C122.925 52.6947 122.761 52.046 122.761 51.318C122.761 50.59 122.915 49.946 123.223 49.386C123.541 48.826 123.97 48.3873 124.511 48.07C125.062 47.7433 125.678 47.58 126.359 47.58C127.05 47.58 127.661 47.7387 128.193 48.056C128.735 48.364 129.159 48.8027 129.467 49.372C129.775 49.932 129.929 50.5807 129.929 51.318C129.929 51.3647 129.925 51.416 129.915 51.472C129.915 51.5187 129.915 51.57 129.915 51.626H123.517V50.884H129.383L128.991 51.178C128.991 50.646 128.875 50.1747 128.641 49.764C128.417 49.344 128.109 49.0173 127.717 48.784C127.325 48.5507 126.873 48.434 126.359 48.434C125.855 48.434 125.403 48.5507 125.001 48.784C124.6 49.0173 124.287 49.344 124.063 49.764C123.839 50.184 123.727 50.6647 123.727 51.206V51.36C123.727 51.92 123.849 52.4147 124.091 52.844C124.343 53.264 124.689 53.5953 125.127 53.838C125.575 54.0713 126.084 54.188 126.653 54.188C127.101 54.188 127.517 54.1087 127.899 53.95C128.291 53.7913 128.627 53.5487 128.907 53.222L129.467 53.866C129.141 54.258 128.73 54.5567 128.235 54.762C127.75 54.9673 127.213 55.07 126.625 55.07ZM131.952 55V47.65H132.904V49.652L132.806 49.302C133.012 48.742 133.357 48.3173 133.842 48.028C134.328 47.7293 134.93 47.58 135.648 47.58V48.546C135.611 48.546 135.574 48.546 135.536 48.546C135.499 48.5367 135.462 48.532 135.424 48.532C134.65 48.532 134.043 48.77 133.604 49.246C133.166 49.7127 132.946 50.38 132.946 51.248V55H131.952ZM140.516 55.07C139.75 55.07 139.078 54.9113 138.5 54.594C137.921 54.2673 137.468 53.824 137.142 53.264C136.815 52.6947 136.652 52.046 136.652 51.318C136.652 50.59 136.806 49.946 137.114 49.386C137.431 48.826 137.86 48.3873 138.402 48.07C138.952 47.7433 139.568 47.58 140.25 47.58C140.94 47.58 141.552 47.7387 142.084 48.056C142.625 48.364 143.05 48.8027 143.358 49.372C143.666 49.932 143.82 50.5807 143.82 51.318C143.82 51.3647 143.815 51.416 143.806 51.472C143.806 51.5187 143.806 51.57 143.806 51.626H137.408V50.884H143.274L142.882 51.178C142.882 50.646 142.765 50.1747 142.532 49.764C142.308 49.344 142 49.0173 141.608 48.784C141.216 48.5507 140.763 48.434 140.25 48.434C139.746 48.434 139.293 48.5507 138.892 48.784C138.49 49.0173 138.178 49.344 137.954 49.764C137.73 50.184 137.618 50.6647 137.618 51.206V51.36C137.618 51.92 137.739 52.4147 137.982 52.844C138.234 53.264 138.579 53.5953 139.018 53.838C139.466 54.0713 139.974 54.188 140.544 54.188C140.992 54.188 141.407 54.1087 141.79 53.95C142.182 53.7913 142.518 53.5487 142.798 53.222L143.358 53.866C143.031 54.258 142.62 54.5567 142.126 54.762C141.64 54.9673 141.104 55.07 140.516 55.07ZM151.005 55L148.233 47.65H149.185L151.705 54.468H151.271L153.861 47.65H154.715L157.277 54.468H156.843L159.405 47.65H160.315L157.529 55H156.591L154.127 48.588H154.421L151.943 55H151.005ZM161.812 55V47.65H162.806V55H161.812ZM162.316 46.026C162.11 46.026 161.938 45.956 161.798 45.816C161.658 45.676 161.588 45.508 161.588 45.312C161.588 45.116 161.658 44.9527 161.798 44.822C161.938 44.682 162.11 44.612 162.316 44.612C162.521 44.612 162.694 44.6773 162.834 44.808C162.974 44.9387 163.044 45.102 163.044 45.298C163.044 45.5033 162.974 45.676 162.834 45.816C162.703 45.956 162.53 46.026 162.316 46.026ZM165.572 55V44.612H166.566V55H165.572ZM169.331 55V44.612H170.325V55H169.331ZM180.549 55.07C179.905 55.07 179.326 54.9253 178.813 54.636C178.3 54.3373 177.894 53.908 177.595 53.348C177.296 52.788 177.147 52.1113 177.147 51.318C177.147 50.5153 177.296 49.8387 177.595 49.288C177.903 48.728 178.314 48.3033 178.827 48.014C179.34 47.7247 179.914 47.58 180.549 47.58C181.249 47.58 181.874 47.7387 182.425 48.056C182.985 48.364 183.424 48.798 183.741 49.358C184.058 49.918 184.217 50.5713 184.217 51.318C184.217 52.0553 184.058 52.7087 183.741 53.278C183.424 53.838 182.985 54.2767 182.425 54.594C181.874 54.9113 181.249 55.07 180.549 55.07ZM176.755 55V44.612H177.749V49.82L177.609 51.304L177.707 52.788V55H176.755ZM180.479 54.188C181.002 54.188 181.468 54.0713 181.879 53.838C182.29 53.5953 182.616 53.2593 182.859 52.83C183.102 52.3913 183.223 51.8873 183.223 51.318C183.223 50.7393 183.102 50.2353 182.859 49.806C182.616 49.3767 182.29 49.0453 181.879 48.812C181.468 48.5693 181.002 48.448 180.479 48.448C179.956 48.448 179.485 48.5693 179.065 48.812C178.654 49.0453 178.328 49.3767 178.085 49.806C177.852 50.2353 177.735 50.7393 177.735 51.318C177.735 51.8873 177.852 52.3913 178.085 52.83C178.328 53.2593 178.654 53.5953 179.065 53.838C179.485 54.0713 179.956 54.188 180.479 54.188ZM189.365 55.07C188.6 55.07 187.928 54.9113 187.349 54.594C186.771 54.2673 186.318 53.824 185.991 53.264C185.665 52.6947 185.501 52.046 185.501 51.318C185.501 50.59 185.655 49.946 185.963 49.386C186.281 48.826 186.71 48.3873 187.251 48.07C187.802 47.7433 188.418 47.58 189.099 47.58C189.79 47.58 190.401 47.7387 190.933 48.056C191.475 48.364 191.899 48.8027 192.207 49.372C192.515 49.932 192.669 50.5807 192.669 51.318C192.669 51.3647 192.665 51.416 192.655 51.472C192.655 51.5187 192.655 51.57 192.655 51.626H186.257V50.884H192.123L191.731 51.178C191.731 50.646 191.615 50.1747 191.381 49.764C191.157 49.344 190.849 49.0173 190.457 48.784C190.065 48.5507 189.613 48.434 189.099 48.434C188.595 48.434 188.143 48.5507 187.741 48.784C187.34 49.0173 187.027 49.344 186.803 49.764C186.579 50.184 186.467 50.6647 186.467 51.206V51.36C186.467 51.92 186.589 52.4147 186.831 52.844C187.083 53.264 187.429 53.5953 187.867 53.838C188.315 54.0713 188.824 54.188 189.393 54.188C189.841 54.188 190.257 54.1087 190.639 53.95C191.031 53.7913 191.367 53.5487 191.647 53.222L192.207 53.866C191.881 54.258 191.47 54.5567 190.975 54.762C190.49 54.9673 189.953 55.07 189.365 55.07ZM3.36 72.07C2.75333 72.07 2.17933 71.986 1.638 71.818C1.09667 71.6407 0.672 71.4213 0.364 71.16L0.812 70.376C1.11067 70.6 1.49333 70.796 1.96 70.964C2.42667 71.1227 2.91667 71.202 3.43 71.202C4.13 71.202 4.634 71.0947 4.942 70.88C5.25 70.656 5.404 70.362 5.404 69.998C5.404 69.7273 5.31533 69.5173 5.138 69.368C4.97 69.2093 4.746 69.0927 4.466 69.018C4.186 68.934 3.87333 68.864 3.528 68.808C3.18267 68.752 2.83733 68.6867 2.492 68.612C2.156 68.5373 1.848 68.43 1.568 68.29C1.288 68.1407 1.05933 67.94 0.882 67.688C0.714 67.436 0.63 67.1 0.63 66.68C0.63 66.2787 0.742 65.9193 0.966 65.602C1.19 65.2847 1.51667 65.0373 1.946 64.86C2.38467 64.6733 2.91667 64.58 3.542 64.58C4.018 64.58 4.494 64.6453 4.97 64.776C5.446 64.8973 5.838 65.0607 6.146 65.266L5.712 66.064C5.38533 65.84 5.03533 65.6813 4.662 65.588C4.28867 65.4853 3.91533 65.434 3.542 65.434C2.87933 65.434 2.38933 65.5507 2.072 65.784C1.764 66.008 1.61 66.2973 1.61 66.652C1.61 66.932 1.694 67.1513 1.862 67.31C2.03933 67.4687 2.268 67.5947 2.548 67.688C2.83733 67.772 3.15 67.842 3.486 67.898C3.83133 67.954 4.172 68.024 4.508 68.108C4.85333 68.1827 5.166 68.29 5.446 68.43C5.73533 68.5607 5.964 68.752 6.132 69.004C6.30933 69.2467 6.398 69.5687 6.398 69.97C6.398 70.3993 6.27667 70.7727 6.034 71.09C5.80067 71.398 5.45533 71.6407 4.998 71.818C4.55 71.986 4.004 72.07 3.36 72.07ZM11.2179 72.07C10.5086 72.07 9.86927 71.9113 9.29994 71.594C8.73994 71.2673 8.2966 70.824 7.96994 70.264C7.64327 69.6947 7.47994 69.046 7.47994 68.318C7.47994 67.5807 7.64327 66.932 7.96994 66.372C8.2966 65.812 8.73994 65.3733 9.29994 65.056C9.85994 64.7387 10.4993 64.58 11.2179 64.58C11.9459 64.58 12.5899 64.7387 13.1499 65.056C13.7193 65.3733 14.1626 65.812 14.4799 66.372C14.8066 66.932 14.9699 67.5807 14.9699 68.318C14.9699 69.046 14.8066 69.6947 14.4799 70.264C14.1626 70.824 13.7193 71.2673 13.1499 71.594C12.5806 71.9113 11.9366 72.07 11.2179 72.07ZM11.2179 71.188C11.7499 71.188 12.2213 71.0713 12.6319 70.838C13.0426 70.5953 13.3646 70.2593 13.5979 69.83C13.8406 69.3913 13.9619 68.8873 13.9619 68.318C13.9619 67.7393 13.8406 67.2353 13.5979 66.806C13.3646 66.3767 13.0426 66.0453 12.6319 65.812C12.2213 65.5693 11.7546 65.448 11.2319 65.448C10.7093 65.448 10.2426 65.5693 9.83194 65.812C9.42127 66.0453 9.0946 66.3767 8.85194 66.806C8.60927 67.2353 8.48794 67.7393 8.48794 68.318C8.48794 68.8873 8.60927 69.3913 8.85194 69.83C9.0946 70.2593 9.42127 70.5953 9.83194 70.838C10.2426 71.0713 10.7046 71.188 11.2179 71.188ZM26.1833 64.58C26.7806 64.58 27.2986 64.6967 27.7373 64.93C28.1853 65.154 28.5306 65.4993 28.7733 65.966C29.0253 66.4327 29.1513 67.0207 29.1513 67.73V72H28.1573V67.828C28.1573 67.0533 27.9706 66.47 27.5973 66.078C27.2333 65.6767 26.7153 65.476 26.0433 65.476C25.5393 65.476 25.1006 65.5833 24.7273 65.798C24.3633 66.0033 24.0786 66.3067 23.8733 66.708C23.6773 67.1 23.5793 67.576 23.5793 68.136V72H22.5853V67.828C22.5853 67.0533 22.3986 66.47 22.0253 66.078C21.6519 65.6767 21.1293 65.476 20.4573 65.476C19.9626 65.476 19.5286 65.5833 19.1553 65.798C18.7819 66.0033 18.4926 66.3067 18.2873 66.708C18.0913 67.1 17.9933 67.576 17.9933 68.136V72H16.9993V64.65H17.9513V66.638L17.7973 66.288C18.0213 65.756 18.3806 65.3407 18.8753 65.042C19.3793 64.734 19.9719 64.58 20.6533 64.58C21.3719 64.58 21.9833 64.762 22.4873 65.126C22.9913 65.4807 23.3179 66.0173 23.4673 66.736L23.0753 66.582C23.2899 65.9847 23.6679 65.504 24.2093 65.14C24.7599 64.7667 25.4179 64.58 26.1833 64.58ZM34.9689 72.07C34.2036 72.07 33.5316 71.9113 32.9529 71.594C32.3743 71.2673 31.9216 70.824 31.5949 70.264C31.2683 69.6947 31.1049 69.046 31.1049 68.318C31.1049 67.59 31.2589 66.946 31.5669 66.386C31.8843 65.826 32.3136 65.3873 32.8549 65.07C33.4056 64.7433 34.0216 64.58 34.7029 64.58C35.3936 64.58 36.0049 64.7387 36.5369 65.056C37.0783 65.364 37.5029 65.8027 37.8109 66.372C38.1189 66.932 38.2729 67.5807 38.2729 68.318C38.2729 68.3647 38.2683 68.416 38.2589 68.472C38.2589 68.5187 38.2589 68.57 38.2589 68.626H31.8609V67.884H37.7269L37.3349 68.178C37.3349 67.646 37.2183 67.1747 36.9849 66.764C36.7609 66.344 36.4529 66.0173 36.0609 65.784C35.6689 65.5507 35.2163 65.434 34.7029 65.434C34.1989 65.434 33.7463 65.5507 33.3449 65.784C32.9436 66.0173 32.6309 66.344 32.4069 66.764C32.1829 67.184 32.0709 67.6647 32.0709 68.206V68.36C32.0709 68.92 32.1923 69.4147 32.4349 69.844C32.6869 70.264 33.0323 70.5953 33.4709 70.838C33.9189 71.0713 34.4276 71.188 34.9969 71.188C35.4449 71.188 35.8603 71.1087 36.2429 70.95C36.6349 70.7913 36.9709 70.5487 37.2509 70.222L37.8109 70.866C37.4843 71.258 37.0736 71.5567 36.5789 71.762C36.0936 71.9673 35.5569 72.07 34.9689 72.07ZM42.6202 72.07C41.9295 72.07 41.3975 71.8833 41.0242 71.51C40.6508 71.1367 40.4642 70.6093 40.4642 69.928V63.026H41.4582V69.872C41.4582 70.3013 41.5655 70.6327 41.7802 70.866C42.0042 71.0993 42.3215 71.216 42.7322 71.216C43.1708 71.216 43.5348 71.09 43.8242 70.838L44.1742 71.552C43.9782 71.7293 43.7402 71.86 43.4602 71.944C43.1895 72.028 42.9095 72.07 42.6202 72.07ZM39.1482 65.476V64.65H43.6982V65.476H39.1482ZM49.7357 64.58C50.333 64.58 50.8557 64.6967 51.3037 64.93C51.761 65.154 52.1157 65.4993 52.3677 65.966C52.629 66.4327 52.7597 67.0207 52.7597 67.73V72H51.7657V67.828C51.7657 67.0533 51.5697 66.47 51.1777 66.078C50.795 65.6767 50.2537 65.476 49.5537 65.476C49.031 65.476 48.5737 65.5833 48.1817 65.798C47.799 66.0033 47.5003 66.3067 47.2857 66.708C47.0803 67.1 46.9777 67.576 46.9777 68.136V72H45.9837V61.612H46.9777V66.666L46.7817 66.288C47.015 65.756 47.3883 65.3407 47.9017 65.042C48.415 64.734 49.0263 64.58 49.7357 64.58ZM55.4446 72V64.65H56.4386V72H55.4446ZM55.9486 63.026C55.7433 63.026 55.5706 62.956 55.4306 62.816C55.2906 62.676 55.2206 62.508 55.2206 62.312C55.2206 62.116 55.2906 61.9527 55.4306 61.822C55.5706 61.682 55.7433 61.612 55.9486 61.612C56.1539 61.612 56.3266 61.6773 56.4666 61.808C56.6066 61.9387 56.6766 62.102 56.6766 62.298C56.6766 62.5033 56.6066 62.676 56.4666 62.816C56.3359 62.956 56.1633 63.026 55.9486 63.026ZM62.9564 64.58C63.5537 64.58 64.0764 64.6967 64.5244 64.93C64.9817 65.154 65.3364 65.4993 65.5884 65.966C65.8497 66.4327 65.9804 67.0207 65.9804 67.73V72H64.9864V67.828C64.9864 67.0533 64.7904 66.47 64.3984 66.078C64.0157 65.6767 63.4744 65.476 62.7744 65.476C62.2517 65.476 61.7944 65.5833 61.4024 65.798C61.0197 66.0033 60.721 66.3067 60.5064 66.708C60.301 67.1 60.1984 67.576 60.1984 68.136V72H59.2044V64.65H60.1564V66.666L60.0024 66.288C60.2357 65.756 60.609 65.3407 61.1224 65.042C61.6357 64.734 62.247 64.58 62.9564 64.58ZM71.8013 74.786C71.1293 74.786 70.4853 74.688 69.8693 74.492C69.2533 74.296 68.754 74.016 68.3713 73.652L68.8753 72.896C69.2206 73.204 69.6453 73.4467 70.1493 73.624C70.6626 73.8107 71.204 73.904 71.7733 73.904C72.7066 73.904 73.3926 73.6847 73.8313 73.246C74.27 72.8167 74.4893 72.1447 74.4893 71.23V69.396L74.6293 68.136L74.5313 66.876V64.65H75.4833V71.104C75.4833 72.3733 75.1706 73.302 74.5453 73.89C73.9293 74.4873 73.0146 74.786 71.8013 74.786ZM71.6193 71.72C70.9193 71.72 70.2893 71.5707 69.7293 71.272C69.1693 70.964 68.726 70.5393 68.3993 69.998C68.082 69.4567 67.9233 68.836 67.9233 68.136C67.9233 67.436 68.082 66.82 68.3993 66.288C68.726 65.7467 69.1693 65.3267 69.7293 65.028C70.2893 64.7293 70.9193 64.58 71.6193 64.58C72.2726 64.58 72.8606 64.7153 73.3833 64.986C73.906 65.2567 74.3213 65.658 74.6293 66.19C74.9373 66.722 75.0913 67.3707 75.0913 68.136C75.0913 68.9013 74.9373 69.55 74.6293 70.082C74.3213 70.614 73.906 71.02 73.3833 71.3C72.8606 71.58 72.2726 71.72 71.6193 71.72ZM71.7173 70.838C72.2586 70.838 72.7393 70.726 73.1593 70.502C73.5793 70.2687 73.9106 69.9513 74.1533 69.55C74.396 69.1393 74.5173 68.668 74.5173 68.136C74.5173 67.604 74.396 67.1373 74.1533 66.736C73.9106 66.3347 73.5793 66.022 73.1593 65.798C72.7393 65.5647 72.2586 65.448 71.7173 65.448C71.1853 65.448 70.7046 65.5647 70.2753 65.798C69.8553 66.022 69.524 66.3347 69.2813 66.736C69.048 67.1373 68.9313 67.604 68.9313 68.136C68.9313 68.668 69.048 69.1393 69.2813 69.55C69.524 69.9513 69.8553 70.2687 70.2753 70.502C70.7046 70.726 71.1853 70.838 71.7173 70.838ZM86.5193 72V70.376L86.4773 70.11V67.394C86.4773 66.7687 86.3 66.288 85.9453 65.952C85.6 65.616 85.082 65.448 84.3913 65.448C83.9153 65.448 83.4627 65.5273 83.0333 65.686C82.604 65.8447 82.24 66.0547 81.9413 66.316L81.4933 65.574C81.8667 65.2567 82.3147 65.014 82.8373 64.846C83.36 64.6687 83.9107 64.58 84.4893 64.58C85.4413 64.58 86.174 64.818 86.6873 65.294C87.21 65.7607 87.4713 66.4747 87.4713 67.436V72H86.5193ZM83.9853 72.07C83.4347 72.07 82.954 71.9813 82.5433 71.804C82.142 71.6173 81.834 71.3653 81.6193 71.048C81.4047 70.7213 81.2973 70.348 81.2973 69.928C81.2973 69.5453 81.386 69.2 81.5633 68.892C81.75 68.5747 82.0487 68.3227 82.4593 68.136C82.8793 67.94 83.4393 67.842 84.1393 67.842H86.6733V68.584H84.1673C83.458 68.584 82.9633 68.71 82.6833 68.962C82.4127 69.214 82.2773 69.5267 82.2773 69.9C82.2773 70.32 82.4407 70.656 82.7673 70.908C83.094 71.16 83.5513 71.286 84.1393 71.286C84.6993 71.286 85.18 71.16 85.5813 70.908C85.992 70.6467 86.2907 70.2733 86.4773 69.788L86.7013 70.474C86.5147 70.9593 86.188 71.3467 85.7213 71.636C85.264 71.9253 84.6853 72.07 83.9853 72.07ZM99.3552 64.58C99.9525 64.58 100.47 64.6967 100.909 64.93C101.357 65.154 101.702 65.4993 101.945 65.966C102.197 66.4327 102.323 67.0207 102.323 67.73V72H101.329V67.828C101.329 67.0533 101.142 66.47 100.769 66.078C100.405 65.6767 99.8872 65.476 99.2152 65.476C98.7112 65.476 98.2725 65.5833 97.8992 65.798C97.5352 66.0033 97.2505 66.3067 97.0452 66.708C96.8492 67.1 96.7512 67.576 96.7512 68.136V72H95.7572V67.828C95.7572 67.0533 95.5705 66.47 95.1972 66.078C94.8238 65.6767 94.3012 65.476 93.6292 65.476C93.1345 65.476 92.7005 65.5833 92.3272 65.798C91.9538 66.0033 91.6645 66.3067 91.4592 66.708C91.2632 67.1 91.1652 67.576 91.1652 68.136V72H90.1712V64.65H91.1232V66.638L90.9692 66.288C91.1932 65.756 91.5525 65.3407 92.0472 65.042C92.5512 64.734 93.1438 64.58 93.8252 64.58C94.5438 64.58 95.1552 64.762 95.6592 65.126C96.1632 65.4807 96.4898 66.0173 96.6392 66.736L96.2472 66.582C96.4618 65.9847 96.8398 65.504 97.3812 65.14C97.9318 64.7667 98.5898 64.58 99.3552 64.58ZM109.625 72V70.376L109.583 70.11V67.394C109.583 66.7687 109.405 66.288 109.051 65.952C108.705 65.616 108.187 65.448 107.497 65.448C107.021 65.448 106.568 65.5273 106.139 65.686C105.709 65.8447 105.345 66.0547 105.047 66.316L104.599 65.574C104.972 65.2567 105.42 65.014 105.943 64.846C106.465 64.6687 107.016 64.58 107.595 64.58C108.547 64.58 109.279 64.818 109.793 65.294C110.315 65.7607 110.577 66.4747 110.577 67.436V72H109.625ZM107.091 72.07C106.54 72.07 106.059 71.9813 105.649 71.804C105.247 71.6173 104.939 71.3653 104.725 71.048C104.51 70.7213 104.403 70.348 104.403 69.928C104.403 69.5453 104.491 69.2 104.669 68.892C104.855 68.5747 105.154 68.3227 105.565 68.136C105.985 67.94 106.545 67.842 107.245 67.842H109.779V68.584H107.273C106.563 68.584 106.069 68.71 105.789 68.962C105.518 69.214 105.383 69.5267 105.383 69.9C105.383 70.32 105.546 70.656 105.873 70.908C106.199 71.16 106.657 71.286 107.245 71.286C107.805 71.286 108.285 71.16 108.687 70.908C109.097 70.6467 109.396 70.2733 109.583 69.788L109.807 70.474C109.62 70.9593 109.293 71.3467 108.827 71.636C108.369 71.9253 107.791 72.07 107.091 72.07ZM112.479 72V71.342L117.379 65.14L117.589 65.476H112.563V64.65H118.373V65.294L113.487 71.51L113.235 71.174H118.471V72H112.479ZM120.427 72V64.65H121.421V72H120.427ZM120.931 63.026C120.726 63.026 120.553 62.956 120.413 62.816C120.273 62.676 120.203 62.508 120.203 62.312C120.203 62.116 120.273 61.9527 120.413 61.822C120.553 61.682 120.726 61.612 120.931 61.612C121.136 61.612 121.309 61.6773 121.449 61.808C121.589 61.9387 121.659 62.102 121.659 62.298C121.659 62.5033 121.589 62.676 121.449 62.816C121.318 62.956 121.146 63.026 120.931 63.026ZM127.939 64.58C128.536 64.58 129.059 64.6967 129.507 64.93C129.964 65.154 130.319 65.4993 130.571 65.966C130.832 66.4327 130.963 67.0207 130.963 67.73V72H129.969V67.828C129.969 67.0533 129.773 66.47 129.381 66.078C128.998 65.6767 128.457 65.476 127.757 65.476C127.234 65.476 126.777 65.5833 126.385 65.798C126.002 66.0033 125.703 66.3067 125.489 66.708C125.283 67.1 125.181 67.576 125.181 68.136V72H124.187V64.65H125.139V66.666L124.985 66.288C125.218 65.756 125.591 65.3407 126.105 65.042C126.618 64.734 127.229 64.58 127.939 64.58ZM136.784 74.786C136.112 74.786 135.468 74.688 134.852 74.492C134.236 74.296 133.736 74.016 133.354 73.652L133.858 72.896C134.203 73.204 134.628 73.4467 135.132 73.624C135.645 73.8107 136.186 73.904 136.756 73.904C137.689 73.904 138.375 73.6847 138.814 73.246C139.252 72.8167 139.472 72.1447 139.472 71.23V69.396L139.612 68.136L139.514 66.876V64.65H140.466V71.104C140.466 72.3733 140.153 73.302 139.528 73.89C138.912 74.4873 137.997 74.786 136.784 74.786ZM136.602 71.72C135.902 71.72 135.272 71.5707 134.712 71.272C134.152 70.964 133.708 70.5393 133.382 69.998C133.064 69.4567 132.906 68.836 132.906 68.136C132.906 67.436 133.064 66.82 133.382 66.288C133.708 65.7467 134.152 65.3267 134.712 65.028C135.272 64.7293 135.902 64.58 136.602 64.58C137.255 64.58 137.843 64.7153 138.366 64.986C138.888 65.2567 139.304 65.658 139.612 66.19C139.92 66.722 140.074 67.3707 140.074 68.136C140.074 68.9013 139.92 69.55 139.612 70.082C139.304 70.614 138.888 71.02 138.366 71.3C137.843 71.58 137.255 71.72 136.602 71.72ZM136.7 70.838C137.241 70.838 137.722 70.726 138.142 70.502C138.562 70.2687 138.893 69.9513 139.136 69.55C139.378 69.1393 139.5 68.668 139.5 68.136C139.5 67.604 139.378 67.1373 139.136 66.736C138.893 66.3347 138.562 66.022 138.142 65.798C137.722 65.5647 137.241 65.448 136.7 65.448C136.168 65.448 135.687 65.5647 135.258 65.798C134.838 66.022 134.506 66.3347 134.264 66.736C134.03 67.1373 133.914 67.604 133.914 68.136C133.914 68.668 134.03 69.1393 134.264 69.55C134.506 69.9513 134.838 70.2687 135.258 70.502C135.687 70.726 136.168 70.838 136.7 70.838Z"
            fill="var(--subFg)"
          />
          <path
            d="M303.859 1.31931L306 5.18069L303.084 6.5L306 7.81931L303.859 11.6807L301.284 9.71782L301.656 13H297.344L297.716 9.71782L295.141 11.6807L293 7.81931L295.916 6.5L293 5.18069L295.141 1.31931L297.716 3.28218L297.344 0H301.656L301.284 3.28218L303.859 1.31931Z"
            fill="var(--accent)"
          />
        </svg>
      )}
    </div>
  );
}
