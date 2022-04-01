import Layout from "components/layout";
import { Provider } from "jotai";
import { appWithTranslation, withTranslation } from "next-i18next";
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

        <meta
          name="description"
          content="Le réseau social de partage de snippets"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Le réseau social de partage de snippets"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Beygs/Beygs/main/assets/snipshare.png?raw=true"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="Le réseau social de partage de snippets"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/Beygs/Beygs/main/assets/snipshare.png?raw=true"
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

export default appWithTranslation(withTranslation("common")(MyApp));
