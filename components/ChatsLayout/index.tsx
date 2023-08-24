"use client";
import { url } from "@/server";
import { Chat } from "@/types/chat";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import useSWR from "swr";
import { FetcherResponse } from "swr/_internal";
import ChatTab from "../ChatTab";
import Loading from "../Loading";
import MenuIcon from "../Icons/Menu";
import Searchbar from "../Searchbar";
import "./chats-layout.css";

interface ChatsLayoutProps {
  children: ReactNode;
}

const fetcher = (params: any[]): FetcherResponse<Chat[]> => {
  const [path, token] = params;

  const res = fetch(path, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

  return res;
};

export default function ChatsLayout({ children }: ChatsLayoutProps) {
  const [serverError, setServerError] = useState<string>("");
  const session = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const { error, isLoading } = useSWR<Chat[]>(
    [`${url}/chats`, session.data?.user?.jwt_token],
    fetcher,
    {
      onSuccess(data: any) {
        if (data.message) {
          setServerError(data.error);
        }

        setChats(data as Chat[]);
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error || serverError ? (
        <div>{error ?? serverError}</div>
      ) : (
        <div className='sidebar'>
          <nav className='flex'>
            <MenuIcon className='mt-[18px] ml-6' />
            <Searchbar />
          </nav>
          <ul>
            {chats.map((chat) => (
              <ChatTab chat={chat} key={chat.id} />
            ))}
          </ul>
          <div>{children}</div>
        </div>
      )}
    </>
  );
}

ChatsLayout.auth = true;
