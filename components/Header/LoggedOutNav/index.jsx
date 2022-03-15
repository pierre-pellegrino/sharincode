import Link from "next/link";
import { LogInIcon, RegisterIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";

const LoggedOutNav = () => {
  return (
    <ul className={navItems}>
      <li>
        <Link href="#">
          <a className={navItem}>
            <RegisterIcon />
            <span className={text}>M&apos;identifier</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a className={navItem}>
            <LogInIcon />
            <span className={text}>Me Connecter</span>
          </a>
        </Link>
      </li>
    </ul>
  )
};

export default LoggedOutNav;
