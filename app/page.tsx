"use client";
import ChatsLayout from "@/components/ChatsLayout";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      push("/auth/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <ChatsLayout>
      <main>{session.status === "loading" ? <Loading /> : <div></div>}</main>
    </ChatsLayout>
  );
}
