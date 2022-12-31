import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { MantineProvider } from "@mantine/core";
import Wrapper from "../src/features/core/Wrapper";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </MantineProvider>
  );
};

export default appWithTranslation(App);
