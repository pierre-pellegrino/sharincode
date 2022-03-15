import { useAtom } from "jotai";
import Link from "next/link";
import { showNewPostModalAtom } from "store";
import { FSocietyMaskIcon, LampIcon, SignOutIcon } from "../../icons";
import { navItems, navItem, text } from "../header.module.scss";

const LoggedInNav = () => {
  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);

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
        <Link href="#">
          <a className={navItem} aria-label="Bouton de déconnexion">
            <SignOutIcon />
            <span className={text}>Me déconnecter</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default LoggedInNav;
