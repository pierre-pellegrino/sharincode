import Link from "next/link";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { header, navItems, logo, text } from "./header.module.scss";
import { LogoLeftSide, LogoRightSide } from "../icons";

const Header = () => {
  const connected = true;

  return (
    <header className={header}>
      <nav>
        <ul className={navItems}>
          <li>
            <Link href="/">
              <a className={logo}>
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
