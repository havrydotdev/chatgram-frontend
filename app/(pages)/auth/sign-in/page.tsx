"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import bg from "@/public/bg.png";
import { AuthInput } from "@/components/AuthInput";
import Link from "next/link";

const SignIn = () => {
  const { push } = useRouter();
  const session = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  return (
    <div className="flex h-screen background-main justify-center items-center">
      <div className="bg-[#fff] rounded-xl shadow-sm w-[570px] h-[500px]  max-sm:mx-[50px]">
        <div className="mx-[70px] my-[50px]">
          <h1 className="font-medium text-[42px]">Sign in</h1>
          <div className="flex flex-col justify-between gap-[15px] mt-[60px]">
            <AuthInput
              placeholder="Email"
              onChange={(e) => {
                e.preventDefault();

                setEmail(e.currentTarget.value);
              }}
              value={email}
            />
            <AuthInput
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();

                setPassword(e.currentTarget.value);
              }}
              value={password}
              type="password"
            />
          </div>
          <Link href="/auth/sign-up" className="block mt-[7px]">
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
