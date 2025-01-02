import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string; // Custom property added
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string; // Custom property added
  }

  interface JWT {
    id: string;
    role: string; // Custom property added to JWT
  }
}
