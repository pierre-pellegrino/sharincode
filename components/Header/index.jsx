import Link from "next/link";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import {
  header,
  navItems,
  logo,
  text,
  skipLink,
  localeLinks,
  logoLocales,
} from "./header.module.scss";
import { LogoLeftSide, LogoRightSide } from "../icons";
import { useAtom } from "jotai";
import { isConnectedAtom } from "store";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import FrFlag from "assets/images/flag-france.png";
import UKFlag from "assets/images/flag-united-kingdom.png";
import Image from "next/image";

const Header = () => {
  const [isConnected] = useAtom(isConnectedAtom);
  const { t } = useTranslation();
  const { asPath } = useRouter();

  return (
    <header className={`${header} bg-global-secondary`}>
      <nav>
        <a href="#main" className={skipLink}>
          {t("skipLink")}
        </a>
        <ul className={navItems} role="navigation">
          <li className={logoLocales}>
            <div>
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
            </div>
            <div className={localeLinks}>
              <Link href={asPath} locale="fr">
                <a>
                  <Image
                    src={FrFlag}
                    height={20}
                    width={20}
                    alt="France's flag"
                  />
                </a>
              </Link>
              <Link href={asPath} locale="en">
                <a>
                  <Image
                    src={UKFlag}
                    height={20}
                    width={20}
                    alt="UK's flag"
                  />
                </a>
              </Link>
            </div>
          </li>
          <li>{isConnected ? <LoggedInNav /> : <LoggedOutNav />}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
