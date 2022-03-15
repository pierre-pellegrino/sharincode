import Link from "next/link";
import { FSocietyMaskIcon, LampIcon, SignOutIcon } from "../../icons";

const LoggedInNav = () => {
  return (
    <ul>
      <li>
        <Link href="#">
          <a>
            <LampIcon />
            Nouveau Snippet
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <FSocietyMaskIcon />
            Mon Compte
          </a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a>
            <SignOutIcon />
            Me déconnecter
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default LoggedInNav;
