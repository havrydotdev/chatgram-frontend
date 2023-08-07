import { SignInInput } from "@/types/login";

export const login = async ({
  email,
  password,
}: SignInInput): Promise<Response> => {
  const res = await fetch(`${process.env.API_URL}/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res;
};
