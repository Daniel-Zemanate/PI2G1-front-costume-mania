import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string };

        //TODO: CONEXIÓN CON API
        // const res = await fetch(URL,{
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     email,
        //     password
        //   })
        // })

        // const user = await res.json()

        // if(res.ok && user){
        //   return user
        // } else return null

        if (email === "abc@mail.com" && password === "123456") {
          return {
            id: 1,
            email: "abc@mail.com",
            name: "Martín Rosas"
          } as any;
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  pages:{
    signIn:"/auth/login"
  }
};

export default NextAuth(authOptions);
