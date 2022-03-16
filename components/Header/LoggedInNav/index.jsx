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
    <ul className={navItems} role="navigation">
      <li>
        <button
          className={navItem}
          aria-label="Créer un nouveau snippet."
          onClick={() => setShowNewPostModal(true)}
        >
          <LampIcon />
          <span className={text}>Nouveau Snippet</span>
        </button>
      </li>
      <li>
        <Link href="#">
          <a className={navItem} aria-label="Accéder à la page de mon compte.">
            <FSocietyMaskIcon />
            <span className={text}>Mon Compte</span>
          </a>
        </Link>
      </li>
      <li>
        <button
          className={navItem}
          aria-label="Bouton de déconnexion"
          onClick={() => handleDisconnect()}
        >
          <SignOutIcon />
          <span className={text}>Me déconnecter</span>
        </button>
      </li>
    </ul>
  );
};

export default LoggedInNav;
