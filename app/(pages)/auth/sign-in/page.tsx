"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import bg from "@/public/bg.png";

const SignIn = () => {
  const { push } = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      push("/");
    }
  }, [session]);

  if (session.status === "loading") {
    return (
      <div className="mt-[95px] ml-[500px]">
        <div className="load"></div>
      </div>
    );
  }

  return <div className="h-screen background-main"></div>;
};

export default SignIn;
