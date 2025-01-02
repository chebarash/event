"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Image from "next/image";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();

  const isHome = pathname == `/`;

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    const { BackButton } = window.Telegram.WebApp;
    if (isHome || window.history.length <= 1) BackButton.hide();
    else BackButton.show();
    const fn = () => router.back();
    BackButton.onClick(fn);
    return () => {
      BackButton.offClick(fn);
      BackButton.hide();
    };
  }, [isHome, router]);

  const listenToScroll = () => {
    let heightToHideFrom = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) setIsVisible(false);
    else setIsVisible(true);
  };

  return (
    <header
      className={[
        styles.header,
        isVisible ? `` : styles.unvisible,
        isHome ? `` : styles.nothome,
      ].join(` `)}
    >
      <div className={styles.container}>
        <button
          onClick={() =>
            window.history?.length && window.history.length > 1
              ? router.back()
              : router.push(`/?`)
          }
          disabled={isHome}
          className={styles.logo}
        >
          <svg width="140" viewBox="0 0 120 18" fill="none">
            <path
              d="M36.2008 9.15852C39.6249 9.15852 41.337 10.1801 41.337 12.2233C41.337 13.1814 41.1042 13.9987 40.6387 14.675C40.1731 15.3373 39.3396 15.8587 38.1382 16.2391C36.9367 16.6055 35.2697 16.7886 33.1372 16.7886H23C23.1201 14.055 23.1802 11.4976 23.1802 9.11625C23.1802 6.73492 23.1201 4.17746 23 1.44386H28.2939V1.46499H33.0921C34.9543 1.46499 36.4186 1.61295 37.4849 1.90885C38.5662 2.19067 39.3246 2.60634 39.7601 3.15588C40.2106 3.70542 40.4359 4.40291 40.4359 5.24835C40.4359 6.10788 40.113 6.87583 39.4673 7.55218C38.8365 8.21444 37.7477 8.74989 36.2008 9.15852ZM28.2939 5.31176V7.27741H32.619C33.5502 7.27741 34.1959 7.19991 34.5564 7.04491C34.9318 6.88992 35.1195 6.6081 35.1195 6.19947C35.1195 5.87538 34.9243 5.64993 34.5338 5.52312C34.1584 5.38221 33.5201 5.31176 32.619 5.31176H28.2939ZM32.619 12.9207C33.4 12.9207 33.9932 12.8926 34.3987 12.8362C34.8192 12.7657 35.1195 12.653 35.2998 12.498C35.48 12.3289 35.5701 12.1035 35.5701 11.8217C35.5701 11.4553 35.3523 11.1946 34.9168 11.0396C34.4963 10.8705 33.7304 10.786 32.619 10.786H28.2939V12.9207H32.619Z"
              className={styles.back}
              fill="var(--fg)"
            />
            <path
              d="M56.0017 16.7886C55.7164 15.9855 55.3334 14.978 54.8529 13.7662H47.6667L46.5404 16.7886H40.8861L47.1937 1.44386H55.4836L61.8362 16.7886H56.0017ZM53.5688 10.469C52.9981 8.98943 52.4124 7.50991 51.8117 6.03038L51.2711 4.65654C50.7454 5.93879 49.972 7.87627 48.9508 10.469H53.5688Z"
              className={styles.back}
              fill="var(--fg)"
            />
            <path
              d="M71.8282 17C68.4341 17 65.9336 16.3236 64.3267 14.9709C62.7198 13.6182 61.9163 11.6878 61.9163 9.17966C61.9163 6.65742 62.7198 4.66358 64.3267 3.19815C65.9336 1.73272 68.4341 1 71.8282 1C76.5739 1 79.7502 2.52884 81.3571 5.58653C80.0055 6.02334 78.4211 6.67856 76.6039 7.55218C76.1684 6.7631 75.4776 6.17834 74.5315 5.79789C73.6003 5.41744 72.6467 5.22721 71.6705 5.22721C70.2288 5.22721 69.155 5.58653 68.4492 6.30515C67.7433 7.00969 67.3904 7.88331 67.3904 8.92602C67.3904 10.0533 67.7658 10.9762 68.5167 11.6948C69.2827 12.3994 70.4466 12.7517 72.0084 12.7517C73.2549 12.7517 74.2461 12.5614 74.982 12.181C75.7179 11.7864 76.2585 11.1664 76.6039 10.321C77.8354 10.941 79.4123 11.6385 81.3346 12.4135C80.5837 14.1185 79.3297 15.3091 77.5726 15.9855C75.8155 16.6618 73.9007 17 71.8282 17Z"
              className={styles.back}
              fill="var(--fg)"
            />
            <path
              d="M94.9265 16.7886C94.2207 15.5909 93.0493 13.7591 91.4123 11.2933L88.7766 13.745V16.7886H83.1674C83.2875 14.055 83.3476 11.4976 83.3476 9.11625C83.3476 6.73492 83.2875 4.17746 83.1674 1.44386H88.7766V7.63672C91.5399 5.07222 93.5073 3.00793 94.6787 1.44386H101.977L94.8815 8.03831C95.9327 9.4192 97.1116 10.9199 98.4182 12.5403C99.7398 14.1607 100.934 15.5768 102 16.7886H94.9265Z"
              className={styles.back}
              fill="var(--fg)"
            />
            <path
              d="M28.2434 12.9669C33.872 12.9376 37.9527 12.8567 40.4855 12.7245C40.3819 13.3269 40.3152 13.9513 40.2856 14.5978C40.2708 15.2296 40.2634 16.0303 40.2634 17H23C23.1185 14.1497 23.1777 11.483 23.1777 9C23.1777 6.51699 23.1185 3.85032 23 1H40.2634V4.98898H28.2434V7.10468C28.9544 7.11938 30.0061 7.12672 31.3984 7.12672C33.7535 7.12672 36.1901 7.08264 38.7081 6.99449V10.7851C36.1901 10.697 33.7535 10.6529 31.3984 10.6529C30.0061 10.6529 28.9544 10.6602 28.2434 10.6749V12.9669Z"
              className={styles.event}
              fill="var(--fg)"
            />
            <path
              d="M60.0459 1L58.5795 4.3719C57.2908 7.35445 56.2762 9.74196 55.5356 11.5344C54.795 13.3269 54.1137 15.1488 53.4916 17H46.8484C46.2411 15.1781 45.5671 13.3783 44.8265 11.6006C44.1008 9.80808 43.1232 7.51607 41.8938 4.72452C41.6864 4.25436 41.1458 3.01286 40.2719 1H46.4485C46.8928 2.42516 47.552 4.25436 48.4259 6.4876C49.1961 8.45638 49.8182 10.1607 50.2922 11.6006C50.6032 10.5868 50.9735 9.50689 51.4031 8.36088C51.8474 7.20018 52.114 6.49495 52.2029 6.24518C53.062 3.99724 53.6915 2.24885 54.0914 1H60.0459Z"
              className={styles.event}
              fill="var(--fg)"
            />
            <path
              d="M66.474 12.9669C72.1025 12.9376 76.1832 12.8567 78.7161 12.7245C78.6124 13.3269 78.5457 13.9513 78.5161 14.5978C78.5013 15.2296 78.4939 16.0303 78.4939 17H61.2305C61.349 14.1497 61.4083 11.483 61.4083 9C61.4083 6.51699 61.349 3.85032 61.2305 1H78.4939V4.98898H66.474V7.10468C67.1849 7.11938 68.2366 7.12672 69.6289 7.12672C71.984 7.12672 74.4206 7.08264 76.9386 6.99449V10.7851C74.4206 10.697 71.984 10.6529 69.6289 10.6529C68.2366 10.6529 67.1849 10.6602 66.474 10.6749V12.9669Z"
              className={styles.event}
              fill="var(--fg)"
            />
            <path
              d="M99.1385 1.02204C99.0349 3.50505 98.983 6.16437 98.983 9C98.983 11.8503 99.0349 14.517 99.1385 17H91.1845L85.8078 4.96694L86.2077 17H80.4977C80.6162 14.1497 80.6754 11.483 80.6754 9C80.6754 6.53168 80.6162 3.87236 80.4977 1.02204H88.6739L94.0728 13.3857L93.6951 1.02204H99.1385Z"
              className={styles.event}
              fill="var(--fg)"
            />
            <path
              d="M120 5.6281C117.675 5.55464 115.416 5.51056 113.224 5.49587V17H107.669V5.49587C105.462 5.51056 103.211 5.55464 100.915 5.6281V1H120V5.6281Z"
              className={styles.event}
              fill="var(--fg)"
            />
            <path
              d="M18 7.17327L15.0358 1.82673L11.4702 4.54455L11.4715 4.53247L11.9857 0H6.01432L6.52983 4.54455L2.9642 1.82673L0 7.17327L4.03819 9L0 10.8267L2.9642 16.1733L6.52983 13.4554L6.01432 18H11.9857L11.4715 13.4675L11.4702 13.4554L15.0358 16.1733L18 10.8267L13.9618 9L18 7.17327Z"
              fill="var(--accent)"
              className={styles.star}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.9999 7.17327L15.0357 1.82674L11.4701 4.54456L11.4715 4.53248L5.58643 9L11.4715 13.4675L11.4701 13.4554L15.0357 16.1733L17.9999 10.8267L13.9618 9L17.9999 7.17327Z"
              fill="var(--accent)"
            />
          </svg>
        </button>
        {(!loading || user) && (
          <>
            {user ? (
              <Image
                src={user.picture || `/profile.png`}
                width={46}
                height={46}
                alt="picture"
              />
            ) : (
              <button
                className={styles.login}
                onClick={() => {
                  window.Telegram.WebApp.openLink(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth?id=${
                      window.Telegram.WebApp.initDataUnsafe.user?.id
                    }&from=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_APP_URL}`
                    )}`
                  );
                  window.Telegram.WebApp.close();
                }}
              >
                Log In
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}
