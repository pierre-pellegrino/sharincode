import Layout from "components/layout";
import { Provider } from "jotai";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
