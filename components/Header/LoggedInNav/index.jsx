import { useAtom } from "jotai";
import Link from "next/link";
import { showNewPostModalAtom } from "store";
import { FSocietyMaskIcon, LampIcon, SignOutIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LoggedInNav = () => {
  const router = useRouter();
  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);

  const handleDisconnect = () => {
    Cookies.remove('token');
    router.push('/');
  }

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
            <span className={text} onClick={() => handleDisconnect()}>Me déconnecter</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default LoggedInNav;
