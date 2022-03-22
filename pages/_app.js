import Layout from "components/layout";
import { Provider, useAtom } from "jotai";
import { THEMES } from "lib/constants/themes";
import { preferedThemeAtom } from "store";
import "styles/globals.scss";
import "styles/reset.scss";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <SWRConfig value={{ provider: () => new Map() }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
