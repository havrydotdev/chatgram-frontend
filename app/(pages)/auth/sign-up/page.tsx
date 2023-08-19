"use client";

import { AuthButton } from "@/components/AuthButton";
import { AuthInput } from "@/components/AuthInput";
import { signUp } from "@/server";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUp = () => {
  const { push } = useRouter();
  const session = useSession();
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
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

  /**
   * Checks if form.password == form.confirm and makes post request to sign in handler
   * @param {React.FormEvent} e - event type passed by react`s onSubmit listener
   */
  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const form = {
        email,
        password,
      };

      // set form values before sending request
      setPassword("");
      setEmail("");
      setName("");
      setUsername("");

      const res = await signUp({ name, username, email, password });

      if (!res?.ok) {
        console.log((await res.json()).message);
      } else {
        push("/auth/sign-in");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen background-main justify-center items-center">
      <div className="bg-[#fff] rounded-xl shadow-sm w-[550px] h-[600px] max-sm:mx-[20px]">
        <div className="sm:mx-[50px] max-sm:mx-[20px] my-[50px]">
          <h1 className="font-medium text-[42px]">Sign up</h1>
          <div className="flex flex-col justify-between gap-[15px] mt-[60px]">
            <AuthInput
              placeholder="Username"
              onChange={(e) => {
                e.preventDefault();

                setUsername(e.currentTarget.value);
              }}
              value={username}
            />

            <AuthInput
              placeholder="Full name"
              onChange={(e) => {
                e.preventDefault();

                setName(e.currentTarget.value);
              }}
              value={name}
            />

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

          <Link
            href="/auth/sign-in"
            className="inline-block mt-[7px] text-navy-grey"
          >
            Already have an account?
          </Link>

          <div className="flex justify-center mt-[40px]">
            <AuthButton text="Sign In" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
