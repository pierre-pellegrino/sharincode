import React from 'react';
import APIManager from "pages/api/axios";
import {
  form,
  inputWrapper,
  input,
  inputPwd,
  btn,
  errmsg,
  offscreen,
  showPwdIcon,
  showPwdIconLogin,
  formLink,
} from "./form.module.scss";

const EmailForm = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");

  const handleForgottenPwd = async () => {

    const data = {
      user: {
        email: email
      }
    }
    try {
      const response = await APIManager.forgottenPassword(data);
    }
    catch (err) {
      console.log("Oups ! Pas de réponse du serveur...");
    }
  }

  return (
<form className={`${form} bg-global-secondary`} onSubmit={handleLogin}>
      <p> Merci de saisir l'adresse email liée à votre compte. </p>

      {success && (
        <p>
          Connexion réussie !<br />
          Vous allez être redirigé sur la page d&apos;accueil...
        </p>
      )}

      <p
        ref={errors}
        className={cn(errmsg, { [offscreen]: !errMsg })}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="email-input"
          placeholder=" "
          ref={emailRef}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email-input">Email</label>
      </div>

        <p onClick={() => handleForgottenPwd()}>Mot de passe oublié ?</p>
      <a href={github_url}>Me connecter avec github</a>
    </form>
  );
};

export default EmailForm;