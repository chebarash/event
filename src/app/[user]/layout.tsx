import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import { Suspense } from "react";
import { UserType } from "./types/types";

export const metadata: Metadata = {
  title: "Event",
  description: "The ultimate hub for students",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { user: string };
}>) {
  const res = await fetch(
    `https://event-api.chebarash.uz/user?_id=${params.user}`
  );
  const user: UserType = await res.json();

  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Suspense>
          <Header user={user} />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
