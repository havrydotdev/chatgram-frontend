import NextAuth, { DefaultSession } from "next-auth";

/**
 * @extends {DefaultUser}
 */
interface IUser extends DefaultUser {
  // JWT token
  id: string;
  // User`s email
  email: string;
  // User`s name
  username: string;
  // User`s image (download url)
  image: string | null | undefined;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  /**
   * @extends {IUser}
   */
  interface JWT extends IUser {}
}
