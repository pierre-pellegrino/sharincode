import { useRef, useEffect, useState } from "react";
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
  github,
} from "./form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import cn from "classnames";
import { userAtom } from "store";
import { useAtom } from "jotai";
import { EyeOffIcon } from "components/icons";
import { EyeIcon } from "components/icons";
import Link from "next/link";
import { GithubIcon } from "components/icons";

const LoginForm = () => {
  const router = useRouter();
  const errors = useRef();

  const emailRef = useRef();

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const canSave = [email, pwd].every(Boolean);

  const [btnValue, setBtnValue] = useState("Me connecter");

  const [_, setUser] = useAtom(userAtom);

  const github_url =
    "https://github.com/login/oauth/authorize?client_id=33b913b565563d4f87c2&scope=user:email";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleForgottenPwd = async () => {
    try {
      const response = await APIManager.forgottenPassword();
    } catch (err) {
      setErrMsg("Oups ! Pas de réponse du serveur...");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg("Un (ou plusieurs) champs sont invalides !");

    setBtnValue("Connexion en cours...");

    const data = {
      user: {
        email,
        password: pwd,
      },
    };

    try {
      const response = await APIManager.login(data);
      setSuccess(true);
      setUser(response.data);

      if (router.query.redirect) {
        router.back();
      } else {
        router.push("/");
      }
    } catch (err) {
      setBtnValue("Me connecter");

      if (!err?.response) {
        setErrMsg("Oups ! Pas de réponse du serveur...");
      } else {
        setErrMsg(err.response.data);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={`${form} bg-global-secondary`} onSubmit={handleLogin}>
      <h1> Connexion </h1>

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

      <div className={inputWrapper}>
        <input
          type={showPwd ? "text" : "password"}
          className={`${input} ${inputPwd}`}
          id="password-input"
          placeholder=" "
          autoComplete="current-password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <label htmlFor="password-input">Mot de passe</label>
        <div
          className={`${showPwdIcon} ${showPwdIconLogin}`}
          focusable="false"
          aria-hidden="true"
          role="complementary"
          onClick={(e) => {
            e.preventDefault();
            setShowPwd(!showPwd);
          }}
        >
          {showPwd ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      </div>

      <input
        className={`${btn} bg-primary txt-btn`}
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
        <span>Pas encore de compte ?</span>
        <Link href="/register">
          <a className="txt-primary"> M&apos;inscrire</a>
        </Link>
      </div>
      <Link href="/forgotten-password">
        <a>Mot de passe oublié ?</a>
      </Link>
    </form>
  );
};

export default LoginForm;
