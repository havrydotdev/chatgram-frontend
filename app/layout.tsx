import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Chat } from "@/types/chat";
import useSWR from "swr";
import { url } from "@/server";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chatgram: simple, but efficient chat web app",
};

const fetcher = (url: string, headers: HeadersInit | undefined) =>
  fetch(url, {
    headers: headers,
  }).then((res) => res.json());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const { error, isLoading } = useSWR<Chat[]>(
    [`${url}/chats`, { Authorization: `Bearer ${1}` }],
    fetcher,
    {
      onSuccess(data) {
        setChats(data);
      },
    }
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
