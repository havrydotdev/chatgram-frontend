import { SignInInput } from "@/types/login";
import { SignUpInput } from "@/types/sign-up";

export const url = "http://localhost:8080";

export const login = async ({
  email,
  password,
}: SignInInput): Promise<Response> => {
  const res = await fetch(`${url}/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

export const signUp = async ({
  name,
  username,
  email,
  password,
}: SignUpInput): Promise<Response> => {
  const res = await fetch(`${url}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify({
      name,
      username,
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return res;
};
