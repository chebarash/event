import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Event",
  description: "The ultimate hub for students",
};

export default function RootLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams?: { [key: string]: string | string[] | undefined };
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
        {Object.values(searchParams || {})}
        <Suspense>
          <Header />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
