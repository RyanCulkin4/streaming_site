import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/global-context";
//import { AuthProvider } from "@/contexts/auth-context"
//import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeVerse - Your Ultimate Anime Streaming Platform",
  description:
    "Discover, watch, and enjoy the best anime content with AnimeVerse. Premium streaming with customizable subscriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-950 text-white min-h-screen`}
      >
         <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
