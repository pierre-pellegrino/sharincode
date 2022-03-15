import { Provider } from "jotai";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
