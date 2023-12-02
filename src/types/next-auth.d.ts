import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string;
      email: string;
      token: string;
      role: "ADMIN" | "USER"
    };
  }
}
