import Link from "next/link";
import { LogInIcon, RegisterIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";

const LoggedOutNav = () => {
  return (
    <ul className={navItems}>
      <li>
        <Link href="/register">
          <a className={navItem}>
            <RegisterIcon />
            <span className={text}>M&apos;inscrire</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a className={navItem}>
            <LogInIcon />
            <span className={text}>Me connecter</span>
          </a>
        </Link>
      </li>
    </ul>
  )
};

export default LoggedOutNav;
