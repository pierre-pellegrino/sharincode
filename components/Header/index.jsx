import Link from "next/link";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { header, navItems, logo, text, skipLink } from "./header.module.scss";
import { LogoLeftSide, LogoRightSide } from "../icons";
import { useAtom } from "jotai";
import { isConnectedAtom } from "store";
import { useTranslation } from "next-i18next";

const Header = () => {
  const [isConnected] = useAtom(isConnectedAtom);
  const { t } = useTranslation();

  return (
    <header className={`${header} bg-global-secondary`}>
      <nav>
        <a href="#main" className={skipLink}>
          {t("skipLink")}
        </a>
        <ul className={navItems} role="navigation">
          <li>
            <Link href="/">
              <a
                className={logo}
                aria-label="Snipshare : Accéder à la page d'accueil."
              >
                <LogoLeftSide />
                <span className={text}>Snipshare</span>
                <LogoRightSide />
              </a>
            </Link>
          </li>
          <li>{isConnected ? <LoggedInNav /> : <LoggedOutNav />}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
