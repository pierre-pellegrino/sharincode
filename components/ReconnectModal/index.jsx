import {
  signUpModal,
  signUpModalBg,
  subcategory,
} from "./reconnect_modal.module.scss";
import Link from "next/link";
import styles from "styles/Home.module.scss";

const ReconnectModal = () => {
  return (
    <div className={signUpModalBg}>
      <div className={`${signUpModal} bg-global-secondary`}>
        <p>Connectez-vous pour accéder à cette page</p>

        <p className={subcategory}>J&apos;ai déjà un compte</p>
        <Link href={{ pathname: "/login", query: { redirect: true } }}>
          <a>
            <button className={`${styles.btn} bg-primary txt-btn`}>
              Me connecter
            </button>
          </a>
        </Link>

        <p className={subcategory}>Je crée mon compte</p>
        <Link href={{ pathname: "/register", query: { redirect: true } }}>
          <a>
            <button className={`${styles.btn} bg-primary txt-btn`}>
              M&apos;inscrire
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ReconnectModal;
