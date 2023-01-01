import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { MantineProvider } from "@mantine/core";
import Wrapper from "../src/features/core/Wrapper";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { DialogManager } from "../src/features/dialog";

const client = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={client}>
        <Wrapper>
          <DialogManager />
          <Component {...pageProps} />
        </Wrapper>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default appWithTranslation(App);
