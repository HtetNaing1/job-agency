import type React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import AntdCompat from "./antdCompact";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JobConnect - Professional Job Agency",
  description:
    "Connect talented professionals with leading companies. Find your dream job or hire top talent.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <AntdCompat />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
