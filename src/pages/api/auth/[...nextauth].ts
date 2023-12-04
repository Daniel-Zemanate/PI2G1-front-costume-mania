import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const body = {
          username: email,
          password: password,
        };

        const response = await fetch(
          `${process.env.PRODUCT_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );

        if (response.ok) {
          const user = await response.json();

          if (user) {
            return user;
          } else {
            throw new Error("The credentials are invalid");
          }
        } else {
          throw new Error("The credentials are invalid");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") return { ...token, ...session.user };
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
