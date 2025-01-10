import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Suspense } from "react";
import { ToastProvider } from "../hooks/useToast";
import { UserProvider } from "../hooks/useUser";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/ui/header/header";
import RouterProvider from "@/hooks/useRouter";

export const metadata: Metadata = {
  title: `Event`,
  description: `The ultimate hub for students`,
  applicationName: `Event`,
  authors: { name: `chebarash`, url: `https://chebarash.uz` },
  keywords: [`event`, `students`, `hub`, `university`],
  creator: `chebarash`,
  openGraph: {
    type: "website",
    title: `Event`,
    description: `The ultimate hub for students`,
    siteName: `Event`,
    images: `https://event.chebarash.uz/thumbnail.png`,
    url: `https://event.chebarash.uz`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" prefix="og: http://ogp.me/ns#">
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
        <RouterProvider>
          <ToastProvider>
            <UserProvider>
              <Suspense>
                <Header />
                {children}
              </Suspense>
            </UserProvider>
          </ToastProvider>
        </RouterProvider>
      </body>
    </html>
  );
}
