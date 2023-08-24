"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthInput } from "@/components/AuthInput";
import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";

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
      <div className='mt-[95px] ml-[500px]'>
        <div className='load'></div>
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

      const res = await signIn("login", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!res?.ok) {
        console.log(res?.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='flex h-screen background-main justify-center items-center'>
      <div className='bg-[#fff] rounded-xl shadow-sm w-[550px] h-[480px] max-sm:mx-[20px]'>
        <div className='sm:mx-[50px] max-sm:mx-[20px] my-[50px]'>
          <h1 className='font-medium text-[42px]'>Sign in</h1>
          <div className='flex flex-col justify-between gap-[15px] mt-[60px]'>
            <AuthInput
              placeholder='Email'
              onChange={(e) => {
                e.preventDefault();

                setEmail(e.currentTarget.value);
              }}
              value={email}
            />

            <AuthInput
              placeholder='Password'
              onChange={(e) => {
                e.preventDefault();

                setPassword(e.currentTarget.value);
              }}
              value={password}
              type='password'
            />
          </div>

          <Link
            href='/auth/sign-up'
            className='inline-block mt-[7px] text-navy-grey'
          >
            Don&apos;t have an account?
          </Link>

          <div className='flex justify-center mt-[40px]'>
            <AuthButton text='Sign In' onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
