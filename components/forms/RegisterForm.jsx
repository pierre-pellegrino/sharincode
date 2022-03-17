import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PWD_REGEX,
} from "lib/constants/validations";
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
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { InfoIcon } from "components/icons";
import ValidationIcon from "components/ValidationIcon";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();

  const usernameRef = useRef();
  const errors = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [pwdConfirm, setPwdConfirm] = useState("");
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const canSave = [validUsername, validEmail, validPwd, validPwdConfirm].every(
    Boolean
  );

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [
    username,
    email,
    pwd,
    pwdConfirm
  ]);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = pwd === pwdConfirm;
    setValidPwdConfirm(result);
  }, [pwd, pwdConfirm]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg("Un (ou plusieurs) champs sont invalides !");

    const data = {
      user: {
        username: username.toLowerCase(),
        email: email,
        password: pwd,
      },
    };

    try {
      const response = await APIManager.register(data);
      console.log(response.data);
      setSuccess(true);
      router.push("/");
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setErrMsg("Oups ! Pas de réponse du serveur...");
      } else {
        setErrMsg(err.response.data.error.message);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={form} onSubmit={handleLogin}>
      <h1> Inscription </h1>

      {success && (
        <p>
          Inscription réussie !<br />
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
          ref={usernameRef}
          autoComplete="off"
          required
          aria-invalid={validUsername ? "false" : "true"}
          aria-describedby="uidnote"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
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
          autoComplete="email"
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          autoComplete="new-password"
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
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
          autoComplete="new-password"
          required
          aria-invalid={validPwdConfirm ? "false" : "true"}
          aria-describedby="pwdconfirmnote"
          value={pwdConfirm}
          onChange={(e) => setPwdConfirm(e.target.value)}
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
          <a> Me connecter</a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
