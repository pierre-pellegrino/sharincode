import { container, main } from "./layout.module.scss";
import Header from "../Header";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { useEffect } from "react";
import APIManager from "pages/api/axios";
import Cookies from "js-cookie";
import SetTheme from "components/SetTheme";
import { THEMES_HASH } from "lib/constants/themes";
import { preferedThemeAtom } from "store";
import Searchbar from "components/Searchbar";

const Layout = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [preferedTheme, setPreferedTheme] = useAtom(preferedThemeAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await APIManager.getMyProfile();

        const favoriteTheme = response.data.user.favorite_theme;

        if (favoriteTheme && THEMES_HASH[favoriteTheme]) {
          setPreferedTheme(favoriteTheme);
        }

        setUser(response.data);
      } catch (e) {
        console.error(e.response);
        Cookies.remove("token");
      }
    };

    if (Cookies.get("token")) getUser();
  }, [setPreferedTheme, setUser, user?.user?.favorite_theme]);

  return (
    <div className={`${container} bg-global txt-global`}>
      <SetTheme highlights={THEMES_HASH[preferedTheme].highlights} />
      <Header />
      <main className={main} id="main" aria-label="Contenu Principal">
        <Searchbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
