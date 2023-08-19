import NextAuth, { DefaultSession } from "next-auth";

/**
 * @extends {DefaultUser}
 */
interface IUser extends DefaultUser {
  // User`s id in db
  id: string;
  // User`s email
  email: string;
  // User`s name
  username: string;
  // User`s image (download url)
  image: string | null | undefined;
  // JWT token
  jwt_token: string;
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
