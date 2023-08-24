import { login } from "@/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      id: "login",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("invalid_credentials");
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await login({ email, password });
        const user = await res.json();
        console.log({ user });
        if (!res.ok) {
          throw new Error("not_exist");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user!.email = token.email;
      session.user!.id = token.id;
      session.user!.name = token.name;
      session.user!.username = token.username;
      session.user!.jwt_token = token.jwt_token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.jwt_token = user.jwt_token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
};
