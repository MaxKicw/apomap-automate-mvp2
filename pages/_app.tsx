// @ts-nocheck
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import Wrapper from "../src/features/core/Wrapper";
import { DialogManager } from "../src/features/dialog";
import { useStore } from "../src/hooks/useStore";
import { apoTheme } from "../styles/apoTheme";
import "../styles/globals.css";

const client = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  const colorScheme = store.colorScheme;

  return (
    <>
      <Head>
        <title> apomap Automate </title>
      </Head>
      <MantineProvider
        theme={
          colorScheme === "light" ? (apoTheme.colorScheme = "dark") : apoTheme
        }
        withGlobalStyles
        withNormalizeCSS
      >
        <QueryClientProvider client={client}>
          <Wrapper>
            <DialogManager />
            <Component {...pageProps} />
          </Wrapper>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
};

export default appWithTranslation(App);
