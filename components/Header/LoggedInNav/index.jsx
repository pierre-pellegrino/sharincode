import { useAtom } from "jotai";
import Link from "next/link";
import { showNewPostModalAtom } from "store";
import { FSocietyMaskIcon, LampIcon, SignOutIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";

const LoggedInNav = () => {
  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);

  return (
    <ul className={navItems}>
      <li>
        <button className={navItem} onClick={() => setShowNewPostModal(true)}>
          <LampIcon />
          <span className={text}>Nouveau Snippet</span>
        </button>
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
