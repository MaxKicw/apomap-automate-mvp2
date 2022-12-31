import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { MantineProvider } from "@mantine/core";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default appWithTranslation(App);
