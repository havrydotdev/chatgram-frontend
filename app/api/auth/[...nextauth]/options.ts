import { login } from "@/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
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
        if (!credentials?.email || !credentials.password) {
          throw new Error("invalid_credentials");
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await login({ email: email, password: password });
        const user = await res.json();

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user!.email = token.email;
      session.user!.id = token.id;
      session.user!.image = token.image;
      session.user!.username = token.username;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.image = user.image;
        token.username = user.username;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
};
