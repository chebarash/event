import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import { Suspense } from "react";
import { ToastProvider } from "./hooks/useToast";
import { UserProvider } from "./hooks/useUser";
import { EventsProvider } from "./hooks/useEvents";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: `Event`,
  description: `The ultimate hub for students`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Analytics />
        <ToastProvider>
          <UserProvider>
            <EventsProvider>
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
