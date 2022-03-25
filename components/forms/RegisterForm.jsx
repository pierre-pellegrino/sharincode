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
  inputPwd,
  btn,
  errmsg,
  offscreen,
  instructions,
  formLink,
  showPwdIcon,
  advantages,
  github
} from "./form.module.scss";
import cn from "classnames";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { InfoIcon } from "components/icons";
import ValidationIcon from "components/ValidationIcon";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { EyeIcon } from "components/icons";
import { EyeOffIcon } from "components/icons";
import { GithubIcon } from "components/icons";

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
  const [showPwd, setShowPwd] = useState(false);

  const [pwdConfirm, setPwdConfirm] = useState("");
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [btnValue, setBtnValue] = useState("M'inscrire");

  const canSave = [validUsername, validEmail, validPwd, validPwdConfirm].every(
    Boolean
  );

  const [_, setUser] = useAtom(userAtom);

  const github_url = 'https://github.com/login/oauth/authorize?client_id=33b913b565563d4f87c2&scope=user:email'

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pwd, pwdConfirm]);

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

    setBtnValue("Inscription en cours...");

    const data = {
      user: {
        username: username.trim(),
        email: email,
        password: pwd,
      },
    };

    try {
      const response = await APIManager.register(data);
      setSuccess(true);
      setUser(response.data);
      router.push("/");
    } catch (err) {
      setBtnValue("M'inscrire");

      if (!err?.response) {
        setErrMsg("Oups ! Pas de réponse du serveur...");
      } else {
        setErrMsg(err.response.data.error.message);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={`${form} bg-global-secondary`} onSubmit={handleLogin}>
      <h1> Inscription </h1>
      <div className={advantages}>
        <p>
          En créant un compte, vous pourrez&nbsp;:
        </p>
        <ul>
          <li>
            Partager vos meilleurs snippets au monde&nbsp;✨
          </li>
          <li>
            Commenter des snippets&nbsp;✍️
          </li>
          <li>
            Réagir aux snippets que vous aimez&nbsp;💡
          </li>
          <li>
            Enregistrer vos snippets préférés dans vos favoris&nbsp;⭐
          </li>
          <li>
            Choisir votre thème préféré&nbsp;🎨
          </li>
        </ul>
      </div>

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
          onChange={(e) => setUsername(e.target.value)}
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
          Entre 4 et 36 caractères.
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
          type={showPwd ? "text" : "password"}
          className={`${input} ${inputPwd}`}
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
        <div
          className={showPwdIcon}
          focusable="false"
          aria-hidden="true"
          onClick={(e) => {
            e.preventDefault();
            setShowPwd(!showPwd);
          }}
        >
          {showPwd ? <EyeOffIcon /> : <EyeIcon />}
        </div>
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
          type={showPwdConfirm ? "text" : "password"}
          className={`${input} ${inputPwd}`}
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
        <div
          className={showPwdIcon}
          focusable="false"
          aria-hidden="true"
          onClick={(e) => {
            e.preventDefault();
            setShowPwdConfirm(!showPwdConfirm);
          }}
        >
          {showPwdConfirm ? <EyeOffIcon /> : <EyeIcon />}
        </div>
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
        className={`${btn} bg-primary txt-btn`}
        tabIndex={0}
        type="submit"
        role="button"
        value={btnValue}
        disabled={!canSave}
      />
      <a href={github_url} className={`${btn} ${github} bg-primary txt-btn`}>
        <GithubIcon />
        Connexion avec github
      </a>
      <div className={formLink}>
        <span>Déjà inscrit ?</span>
        <Link href="/login">
          <a className="txt-primary"> Me connecter</a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
