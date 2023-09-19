import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Press_Start_2P } from "next/font/google";

const press_Start_2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

import "nes.css/css/nes.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixies",
  description: "Game Cards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={press_Start_2P.className}>{children}</body>
    </html>
  );
}
