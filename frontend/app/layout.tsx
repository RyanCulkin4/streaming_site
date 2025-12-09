import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, GlobalProvider } from "@/hooks/global-context";
//import { AuthProvider } from "@/contexts/auth-context"
//import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "KokoroTV - Where stories touch the heart"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-purple-950 to-indigo-950 text-white snap-y snap-mandatory h-screen overflow-y-auto">
          <GlobalProvider><AuthProvider>{children}</AuthProvider></GlobalProvider>
        </div>
      </body>
    </html>
  );
}
