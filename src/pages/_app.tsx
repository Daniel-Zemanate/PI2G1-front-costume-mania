import "@/styles/globals.css";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

type Props = {
  session: any;
};

export default function App({
  Component,
  pageProps,
  session,
}: AppProps & Props) {

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
