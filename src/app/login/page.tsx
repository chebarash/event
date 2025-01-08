"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <h1>Log in to event</h1>
      <button
        onClick={() => {
          if (window.Telegram.WebApp.initData.length)
            window.Telegram.WebApp.openLink(
              `${process.env.NEXT_PUBLIC_BASE_URL}/auth?id=${
                window.Telegram.WebApp.initDataUnsafe.user?.id
              }&from=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_APP_URL}`
              )}`
            );
          else
            window.Telegram.WebApp.openLink(
              `${process.env.NEXT_PUBLIC_APP_URL}`
            );
          window.Telegram.WebApp.close();
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M30.0002 15.3321C30.0002 14.1 29.8964 13.2004 29.6768 12.2656H15.3057V17.8314H23.7407C23.5691 19.216 22.6509 21.2968 20.611 22.697L25.4413 26.3658C28.3315 23.7492 30.0002 19.9005 30.0002 15.3321Z"
            fill="var(--accent)"
            fillOpacity="0.4"
          />
          <path
            d="M15.3015 29.9999C19.4332 29.9999 22.9022 28.6661 25.4371 26.3663L20.6068 22.7014C19.3134 23.5854 17.5809 24.1994 15.3015 24.1994C11.2536 24.1994 7.81649 21.5828 6.59494 17.9688L1.62891 21.7353C4.14386 26.6323 9.31747 29.9999 15.3015 29.9999Z"
            fill="var(--accent)"
            fillOpacity="0.5"
          />
          <path
            d="M6.59476 17.9647C6.27141 17.0299 6.08379 16.0326 6.08379 15C6.08379 13.9674 6.27141 12.9661 6.57879 12.0352L6.57081 11.8358L1.78841 8.19434L1.63272 8.26865C0.594806 10.3025 0 12.5867 0 15C0 17.4133 0.594806 19.6975 1.63272 21.7313L6.59476 17.9647Z"
            fill="var(--accent)"
            fillOpacity="0.6"
          />
          <path
            d="M15.3015 5.80045C18.1758 5.80045 20.1159 7.01686 21.2217 8.03379L25.541 3.89956C22.8863 1.48238 19.4333 0 15.3015 0C9.31357 0 4.14394 3.36762 1.625 8.26456L6.57506 12.0311C7.82056 8.4171 11.2537 5.80045 15.3015 5.80045Z"
            fill="var(--accent)"
          />
        </svg>
        Continue with Google
      </button>
      <section>
        <h4>Important</h4>
        <p>
          Use your New Uzbekistan University email address{" "}
          <code>(@newuu.uz)</code>.
        </p>
        <p>
          By joining, you agree to our{" "}
          <Link href="/policy">Privacy Policy</Link>.
        </p>
      </section>
      <section>
        <h4>Need Help?</h4>
        <p>
          Contact at{" "}
          <Link
            href="https://t.me/m/_mZ-DLfsNzZi"
            target="_blank"
            rel="noopener noreferrer"
          >
            @chebarash
          </Link>
        </p>
      </section>
    </main>
  );
}
