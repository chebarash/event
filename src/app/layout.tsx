import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Suspense } from "react";
import { ToastProvider } from "../hooks/useToast";
import { UserProvider } from "../hooks/useUser";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/ui/header/header";

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
            <Suspense>
              <Header />
              {children}
            </Suspense>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
