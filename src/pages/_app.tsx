import "@/styles/globals.css";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  );
}
