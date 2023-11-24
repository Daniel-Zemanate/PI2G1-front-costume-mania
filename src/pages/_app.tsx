import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
  session: any;
};

export default function App({
  Component,
  pageProps,
  session,
}: AppProps & Props) {
  return (
    <>
      <NextNProgress color="#FF941A" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
