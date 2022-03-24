import Layout from "components/layout";
import { Provider } from "jotai";
import Head from "next/head";
import "styles/globals.scss";
import "styles/reset.scss";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>
      <Provider>
        <SWRConfig value={{ provider: () => new Map() }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </Provider>
    </>
  );
};

export default MyApp;
