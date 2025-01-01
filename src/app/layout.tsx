import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Suspense } from "react";
import { ToastProvider } from "../hooks/useToast";
import { UserProvider } from "../hooks/useUser";
import { EventsProvider } from "../hooks/useEvents";
import { Analytics } from "@vercel/analytics/react";
import { EventType } from "../types/types";
import Header from "@/ui/header/header";
import axiosInstance from "@/hooks/axiosInstance";

export const metadata: Metadata = {
  title: `Event`,
  description: `The ultimate hub for students`,
};

export const revalidate = 30;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const result = await axiosInstance.get<Array<EventType>>(
    `/event?gte=${date.toISOString()}`
  );
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Sometype+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Analytics />
        <ToastProvider>
          <UserProvider>
            <EventsProvider event={result.data}>
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
