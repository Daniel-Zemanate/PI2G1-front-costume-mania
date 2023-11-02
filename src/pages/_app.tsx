import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

type Props = {
  session: any;
};

export default function App({
  Component,
  pageProps,
  session,
}: AppProps & Props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
