import React from 'react';
import {
  signUpModal,
  signUpModalBg,
  subcategory,
} from "./signup_modal.module.scss";
import Link from "next/link";
import styles from "styles/Home.module.scss";

const SignUpInvitation = ({user}) => {
  return (
    <div className={signUpModalBg}>
      <div className={`${signUpModal} bg-global-secondary`} >
        <p>
          Vous devez avoir un compte pour accéder au profil de {user}.
        </p>

        <p className={subcategory}>J'ai déjà un compte</p>
        <Link href="/login">
          <a>
            <button className={`${styles.btn} bg-primary txt-btn`}>Me connecter</button>
          </a>
        </Link>

        <p className={subcategory}>Je crée mon compte</p>
        <Link href="/register">
          <a>
            <button className={`${styles.btn} bg-primary txt-btn`}>M&apos;inscrire</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignUpInvitation;