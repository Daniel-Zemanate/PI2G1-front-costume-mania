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
          throw new Error('The credentials are invalid')
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
