"use client";

import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactElement, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/Loading";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chatgram: simple, but efficient chat web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          {typeof children === "object" && (children as ReactElement).auth ? (
            children
          ) : (
            <Auth>{children as ReactElement}</Auth>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}

function Auth({ children }: { children: ReactElement }) {
  const session = useSession();
  const isUser = !!session?.data?.user;
  useEffect(() => {
    if (session.status === "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, session]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />;
}
