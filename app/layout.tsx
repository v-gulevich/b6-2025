import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import ForcePortrait from "../components/ForcePortrait";

export const metadata: Metadata = {
  title: "Board",
  authors: [
    {
      name: "Vladislav Gulevich",
      url: "https://www.gulevich.by",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, orientation=portrait" />
        <meta name="theme-color" content="#fff" />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="screen-orientation" content="portrait" />
        <meta name="msapplication-orientation" content="portrait" />
      </Head>
      <body
        className={`antialiased`}
      >
        <ForcePortrait />
        {children}
      </body>
    </html>
  );
}
