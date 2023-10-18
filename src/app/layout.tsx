import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { ReactQueryProvider } from "./ReactQueryProvider";

const press_Start_2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

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
    <ReactQueryProvider>
      <html lang="en">
        <body className={press_Start_2P.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
