import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sweet Freak & Jollies - Candied Fruits & Adult Drinks",
  description: "A mother-daughter duo bringing you candied fruits and adult drinks with a Jolly Rancher twist!",
  keywords: "candied fruits, adult drinks, jolly rancher, candy, cocktails",
  openGraph: {
    title: "Sweet Freak & Jollies",
    description: "Delicious candied fruits and adult drinks with a Jolly Rancher twist!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
