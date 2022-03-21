import { container, main } from "./layout.module.scss";
import Header from "../Header";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { useEffect } from "react";
import APIManager from "pages/api/axios";
import Cookies from "js-cookie";
import SetTheme from "components/SetTheme";
import { THEMES } from "lib/constants/themes";
import { preferedThemeAtom } from "store";

const Layout = ({ children }) => {
  const [_, setUser] = useAtom(userAtom);
  const preferedTheme = useAtom(preferedThemeAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await APIManager.loginWithToken();
        setUser(response.data);
      } catch (e) {
        console.error(e.response);
        Cookies.remove("token");
      }
    };

    if (Cookies.get("token")) getUser();
  }, [setUser]);

  return (
    <div className={container}>
      <SetTheme highlights={THEMES.filter((theme) => theme.id === "3024-night")[0].highlights} />
      <Header />
      <main className={main} id="main" aria-label="Contenu Principal">
        {children}
      </main>
    </div>
  );
};

export default Layout;
