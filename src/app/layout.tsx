import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import { Suspense } from "react";
import { ToastProvider } from "./hooks/useToast";
import { UserProvider } from "./hooks/useUser";
import { EventsProvider } from "./hooks/useEvents";
import { Analytics } from "@vercel/analytics/react";
import { EventType } from "./types/types";
import axios from "axios";

export const metadata: Metadata = {
  title: `Event`,
  description: `The ultimate hub for students`,
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = (
    await axios.get<Array<EventType>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/event`
    )
  ).data.map(({ date, ...extra }) => ({ date: new Date(date), ...extra }));
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Analytics />
        <ToastProvider>
          <UserProvider>
            <EventsProvider event={result}>
              <Suspense>
                <Header />
                {children}
              </Suspense>
            </EventsProvider>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
