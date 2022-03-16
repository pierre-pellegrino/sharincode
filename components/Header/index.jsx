import Link from "next/link";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { header, navItems, logo, text, skipLink } from "./header.module.scss";
import { LogoLeftSide, LogoRightSide } from "../icons";
import Cookies from 'js-cookie';

const Header = () => {
  const connected = Cookies.get('token');

  return (
    <header className={header}>
      <nav>
        <Link href="#main">
          <a className={skipLink}>
            Accéder au contenu principal
          </a>
        </Link> 
        <ul className={navItems} role="navigation">
          <li>
            <Link href="/">
              <a className={logo} aria-label="SnipShare : Accéder à la page d'accueil.">
                <LogoLeftSide />
                <span className={text}>SnipShare</span>
                <LogoRightSide />
              </a>
            </Link>
          </li>
          <li>
            {
              connected
              ? <LoggedInNav />
              : <LoggedOutNav />
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
