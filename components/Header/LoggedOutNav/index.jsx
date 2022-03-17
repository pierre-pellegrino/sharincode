import Link from "next/link";
import { LogInIcon, RegisterIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";

const LoggedOutNav = () => {
  return (
    <ul className={navItems} role="navigation ">
      <li>
        <Link href="/register">
          <a className={navItem} aria-label="Accéder à la page d'inscription" >
            <RegisterIcon />
            <span className={text}>M&apos;inscrire</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a className={navItem} aria-label="Accéder à la page de connexion">
            <LogInIcon />
            <span className={text}>Me connecter</span>
          </a>
        </Link>
      </li>
    </ul>
  )
};

export default LoggedOutNav;
