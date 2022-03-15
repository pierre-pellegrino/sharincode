import Link from "next/link";
import { FSocietyMaskIcon, LampIcon, SignOutIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";

const LoggedInNav = () => {
  return (
    <ul className={navItems}>
      <li>
        <Link href="#">
          <a className={navItem}>
            <LampIcon />
            <span className={text}>Nouveau Snippet</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a className={navItem}>
            <FSocietyMaskIcon />
            <span className={text}>Mon Compte</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a className={navItem}>
            <SignOutIcon />
            <span className={text}>Me déconnecter</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default LoggedInNav;
