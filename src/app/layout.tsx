import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import { Suspense } from "react";
import { SessProvider } from "./hooks/session";

export const metadata: Metadata = {
  title: "Event",
  description: "The ultimate hub for students",
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
        <SessProvider>
          <Suspense>
            <Header />
          </Suspense>
          {children}
        </SessProvider>
      </body>
    </html>
  );
}
