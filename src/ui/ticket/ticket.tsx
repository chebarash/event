"use client";

import { useRouter } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import styles from "./ticket.module.css";
import { useEffect } from "react";

export default function Ticket({
  title,
  _id,
  eventId,
  registered,
}: {
  title: string;
  _id: string;
  eventId: string;
  registered: boolean;
}) {
  const router = useRouter();
  const bg = registered ? `#000000` : `#ff0d0d`;

  useEffect(() => {
    const { MainButton, setBottomBarColor, setHeaderColor, themeParams } =
      window.Telegram.WebApp;
    setBottomBarColor(bg);
    setHeaderColor(bg);
    MainButton.setParams({
      is_active: true,
      is_visible: true,
      text: `Cancel`,
      color: `#ffffff`,
      text_color: `#000000`,
    });
    const fn = () => router.replace(`/events/${eventId}`);
    MainButton.onClick(fn);
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(fn);
      if (themeParams.bottom_bar_bg_color && themeParams.header_bg_color) {
        setBottomBarColor(themeParams.bottom_bar_bg_color);
        setHeaderColor(themeParams.header_bg_color);
      }
    };
  }, []);

  return (
    <main className={styles.container} style={{ background: bg }}>
      <svg className={styles.logo} width="140" viewBox="0 0 120 18" fill="none">
        <path
          d="M28.2434 12.9669C33.872 12.9376 37.9527 12.8567 40.4855 12.7245C40.3819 13.3269 40.3152 13.9513 40.2856 14.5978C40.2708 15.2296 40.2634 16.0303 40.2634 17H23C23.1185 14.1497 23.1777 11.483 23.1777 9C23.1777 6.51699 23.1185 3.85032 23 1H40.2634V4.98898H28.2434V7.10468C28.9544 7.11938 30.0061 7.12672 31.3984 7.12672C33.7535 7.12672 36.1901 7.08264 38.7081 6.99449V10.7851C36.1901 10.697 33.7535 10.6529 31.3984 10.6529C30.0061 10.6529 28.9544 10.6602 28.2434 10.6749V12.9669Z"
          className={styles.event}
          fill="#ffffff"
        />
        <path
          d="M60.0459 1L58.5795 4.3719C57.2908 7.35445 56.2762 9.74196 55.5356 11.5344C54.795 13.3269 54.1137 15.1488 53.4916 17H46.8484C46.2411 15.1781 45.5671 13.3783 44.8265 11.6006C44.1008 9.80808 43.1232 7.51607 41.8938 4.72452C41.6864 4.25436 41.1458 3.01286 40.2719 1H46.4485C46.8928 2.42516 47.552 4.25436 48.4259 6.4876C49.1961 8.45638 49.8182 10.1607 50.2922 11.6006C50.6032 10.5868 50.9735 9.50689 51.4031 8.36088C51.8474 7.20018 52.114 6.49495 52.2029 6.24518C53.062 3.99724 53.6915 2.24885 54.0914 1H60.0459Z"
          className={styles.event}
          fill="#ffffff"
        />
        <path
          d="M66.474 12.9669C72.1025 12.9376 76.1832 12.8567 78.7161 12.7245C78.6124 13.3269 78.5457 13.9513 78.5161 14.5978C78.5013 15.2296 78.4939 16.0303 78.4939 17H61.2305C61.349 14.1497 61.4083 11.483 61.4083 9C61.4083 6.51699 61.349 3.85032 61.2305 1H78.4939V4.98898H66.474V7.10468C67.1849 7.11938 68.2366 7.12672 69.6289 7.12672C71.984 7.12672 74.4206 7.08264 76.9386 6.99449V10.7851C74.4206 10.697 71.984 10.6529 69.6289 10.6529C68.2366 10.6529 67.1849 10.6602 66.474 10.6749V12.9669Z"
          className={styles.event}
          fill="#ffffff"
        />
        <path
          d="M99.1385 1.02204C99.0349 3.50505 98.983 6.16437 98.983 9C98.983 11.8503 99.0349 14.517 99.1385 17H91.1845L85.8078 4.96694L86.2077 17H80.4977C80.6162 14.1497 80.6754 11.483 80.6754 9C80.6754 6.53168 80.6162 3.87236 80.4977 1.02204H88.6739L94.0728 13.3857L93.6951 1.02204H99.1385Z"
          className={styles.event}
          fill="#ffffff"
        />
        <path
          d="M120 5.6281C117.675 5.55464 115.416 5.51056 113.224 5.49587V17H107.669V5.49587C105.462 5.51056 103.211 5.55464 100.915 5.6281V1H120V5.6281Z"
          className={styles.event}
          fill="#ffffff"
        />
        <path
          d="M18 7.17327L15.0358 1.82673L11.4702 4.54455L11.4715 4.53247L11.9857 0H6.01432L6.52983 4.54455L2.9642 1.82673L0 7.17327L4.03819 9L0 10.8267L2.9642 16.1733L6.52983 13.4554L6.01432 18H11.9857L11.4715 13.4675L11.4702 13.4554L15.0358 16.1733L18 10.8267L13.9618 9L18 7.17327Z"
          fill={registered ? `#ff0d0d` : `#ffffff`}
        />
      </svg>
      <section className={styles.ticket}>
        <h1>{title}</h1>
        <svg className={styles.row} width="100%" viewBox="0 0 350 60">
          <path
            d="M350 60C333.431 60 320 46.5685 320 30C320 13.4315 333.431 0 350 0V60Z"
            fill={bg}
          />
          <path
            d="M30 30C30 46.5685 16.5685 60 0 60V0C16.5685 0 30 13.4315 30 30Z"
            fill={bg}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.6309 30C40.6309 28.067 42.1979 26.5 44.1309 26.5H49.2033C51.1363 26.5 52.7033 28.067 52.7033 30C52.7033 31.933 51.1363 33.5 49.2033 33.5H44.1309C42.1979 33.5 40.6309 31.933 40.6309 30ZM63.9642 30C63.9642 28.067 65.5312 26.5 67.4642 26.5H72.5367C74.4697 26.5 76.0367 28.067 76.0367 30C76.0367 31.933 74.4697 33.5 72.5367 33.5H67.4642C65.5312 33.5 63.9642 31.933 63.9642 30ZM87.2975 30C87.2975 28.067 88.8645 26.5 90.7975 26.5H95.87C97.803 26.5 99.37 28.067 99.37 30C99.37 31.933 97.803 33.5 95.87 33.5H90.7975C88.8645 33.5 87.2975 31.933 87.2975 30ZM110.631 30C110.631 28.067 112.198 26.5 114.131 26.5H119.203C121.136 26.5 122.703 28.067 122.703 30C122.703 31.933 121.136 33.5 119.203 33.5H114.131C112.198 33.5 110.631 31.933 110.631 30ZM133.964 30C133.964 28.067 135.531 26.5 137.464 26.5H142.537C144.47 26.5 146.037 28.067 146.037 30C146.037 31.933 144.47 33.5 142.537 33.5H137.464C135.531 33.5 133.964 31.933 133.964 30ZM157.298 30C157.298 28.067 158.865 26.5 160.798 26.5H165.87C167.803 26.5 169.37 28.067 169.37 30C169.37 31.933 167.803 33.5 165.87 33.5H160.798C158.865 33.5 157.298 31.933 157.298 30ZM180.631 30C180.631 28.067 182.198 26.5 184.131 26.5H189.203C191.136 26.5 192.703 28.067 192.703 30C192.703 31.933 191.136 33.5 189.203 33.5H184.131C182.198 33.5 180.631 31.933 180.631 30ZM203.964 30C203.964 28.067 205.531 26.5 207.464 26.5H212.537C214.47 26.5 216.037 28.067 216.037 30C216.037 31.933 214.47 33.5 212.537 33.5H207.464C205.531 33.5 203.964 31.933 203.964 30ZM227.298 30C227.298 28.067 228.865 26.5 230.798 26.5H235.87C237.803 26.5 239.37 28.067 239.37 30C239.37 31.933 237.803 33.5 235.87 33.5H230.798C228.865 33.5 227.298 31.933 227.298 30ZM250.631 30C250.631 28.067 252.198 26.5 254.131 26.5H259.203C261.136 26.5 262.703 28.067 262.703 30C262.703 31.933 261.136 33.5 259.203 33.5H254.131C252.198 33.5 250.631 31.933 250.631 30ZM273.964 30C273.964 28.067 275.531 26.5 277.464 26.5H282.537C284.47 26.5 286.037 28.067 286.037 30C286.037 31.933 284.47 33.5 282.537 33.5H277.464C275.531 33.5 273.964 31.933 273.964 30ZM297.297 30C297.297 28.067 298.865 26.5 300.797 26.5H305.87C307.803 26.5 309.37 28.067 309.37 30C309.37 31.933 307.803 33.5 305.87 33.5H300.797C298.865 33.5 297.297 31.933 297.297 30Z"
            fill={bg}
          />
        </svg>
        <div className={styles.qr}>
          <QRCode
            size={180}
            value={_id}
            quietZone={0}
            bgColor="#ffffff"
            fgColor="#000000"
            qrStyle="fluid"
            eyeRadius={[
              [20, 0, 0, 0],
              [0, 20, 0, 0],
              [0, 0, 0, 20],
            ]}
          />
        </div>
      </section>
      {!registered && <h4>Not Registered</h4>}
      <p>Show at Registration</p>
    </main>
  );
}
