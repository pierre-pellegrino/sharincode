import { USERNAME_REGEX } from "lib/constants/validations";
import { useEffect, useRef, useState } from "react";
import {
  form,
  inputWrapper,
  input,
  btn,
  errmsg,
  offscreen,
  instructions,
  formLink,
} from "./form.module.scss";
import cn from "classnames";
import { EMAIL_REGEX, PWD_REGEX } from "../../lib/constants/validations";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { InfoIcon } from "components/icons";
import ValidationIcon from "components/ValidationIcon";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const errors = useRef();

  const username = useRef();
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const email = useRef();
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const pwd = useRef();
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const pwdConfirm = useRef();
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const canSave = [validUsername, validEmail, validPwd, validPwdConfirm].every(
    Boolean
  );

  useEffect(() => {
    username.current.focus();
  }, []);

  const usernameValidation = () => {
    const result = USERNAME_REGEX.test(username.current.value);
    setValidUsername(result);
  };

  const emailValidation = () => {
    const result = EMAIL_REGEX.test(email.current.value);
    setValidEmail(result);
  };

  const pwdValidation = () => {
    const result = PWD_REGEX.test(pwd.current.value);
    setValidPwd(result);
  };

  const pwdConfirmValidation = () => {
    const result = pwd.current.value === pwdConfirm.current.value;
    setValidPwdConfirm(result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg("Un (ou plusieurs) champs sont invalides !");

    const data = {
      user: {
        username: username.current?.value.toLowerCase(),
        email: email.current?.value,
        password: pwd.current?.value,
      },
    };

    try {
      const response = await APIManager.register(data);
      console.log(response.data);
      setSuccess(true);
      router.push("/");
    } catch (error) {
      console.log(error.response);
      if (!err?.response) {
        setErrMsg("Oups ! Il semblerait qu'il y ait un problème de serveur...");
      } else {
        setErrMsg(error.response.data.error.message)
      }
      errors.current.focus();
    }
  };

  return (
    <form className={form} onSubmit={handleLogin}>
      <h1> Inscription </h1>

      {success && (
        <p>
          Inscription réussie !<br/>
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
          id="username-input"
          placeholder=" "
          ref={username}
          autoComplete="off"
          required
          aria-invalid={validUsername ? "false" : "true"}
          aria-describedby="uidnote"
          onChange={usernameValidation}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        <label htmlFor="username-input">Nom d&apos;utilisateur</label>
        <ValidationIcon isValid={validUsername} />
        <p
          id="uidnote"
          className={cn(instructions, {
            [offscreen]: !(usernameFocus && username && !validUsername),
          })}
        >
          <InfoIcon />
          Au moins 4 caractères.
          <br />
          Doit commencer par une lettre
          <br />
          Caractères autorisés: lettres, nombres, tirets (- et _).
        </p>
      </div>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="email-input"
          placeholder=" "
          ref={email}
          autoComplete="email"
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onChange={emailValidation}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <label htmlFor="email-input">Email</label>
        <ValidationIcon isValid={validEmail} />
        <p
          id="emailnote"
          className={cn(instructions, {
            [offscreen]: !(emailFocus && email && !validEmail),
          })}
        >
          Veuillez entrer un email valide.
        </p>
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="password-input"
          placeholder=" "
          ref={pwd}
          autoComplete="new-password"
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onChange={pwdValidation}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <label htmlFor="password-input">Mot de passe</label>
        <ValidationIcon isValid={validPwd} />
        <p
          id="pwdnote"
          className={cn(instructions, {
            [offscreen]: !(pwdFocus && pwd && !validPwd),
          })}
        >
          Au moins 6 caractères.
        </p>
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="passwordConfirm-input"
          placeholder=" "
          ref={pwdConfirm}
          autoComplete="new-password"
          required
          aria-invalid={validPwdConfirm ? "false" : "true"}
          aria-describedby="pwdconfirmnote"
          onChange={pwdConfirmValidation}
          onFocus={() => setPwdConfirmFocus(true)}
          onBlur={() => setPwdConfirmFocus(false)}
        />
        <label htmlFor="passwordConfirm-input">
          Confirmation du mot de passe
        </label>
        <ValidationIcon isValid={validPwdConfirm && validPwd} />
        <p
          id="pwdconfirmnote"
          className={cn(instructions, {
            [offscreen]: !(pwdConfirmFocus && pwdConfirm && !validPwdConfirm),
          })}
        >
          Veuillez réécrire votre mot de passe.
        </p>
      </div>

      <input
        className={btn}
        tabIndex={0}
        type="submit"
        role="button"
        value="M'inscrire"
        disabled={!canSave}
      />
      <div className={formLink}>
        <span>Déjà inscrit ?</span>
        <Link href="/login">
          <a>
            {" "}Me connecter
          </a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
