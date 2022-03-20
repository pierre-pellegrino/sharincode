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
} from "./form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import cn from "classnames";
import { userAtom } from "store";
import { useAtom } from "jotai";
import { EyeOffIcon } from "components/icons";
import { EyeIcon } from "components/icons";
import Link from "next/link";

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

  const [_, setUser] = useAtom(userAtom);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg("Un (ou plusieurs) champs sont invalides !");

    const data = {
      user: {
        email,
        password: pwd,
      },
    };

    try {
      const response = await APIManager.login(data);
      console.log(response.data);
      setSuccess(true);
      setUser(response.data);
      router.push("/");
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setErrMsg("Oups ! Pas de réponse du serveur...");
      } else {
        setErrMsg(err.response.data.message);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={form} onSubmit={handleLogin}>
      <h1> Connexion </h1>

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
        <button
          className={`${showPwdIcon} ${showPwdIconLogin}`}
          onClick={(e) => {
            e.preventDefault();
            setShowPwd(!showPwd);
          }}
        >
          {showPwd ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="Me connecter"
        disabled={!canSave}
      />
      <div className={formLink}>
        <span>Pas encore de compte ?</span>
        <Link href="/register">
          <a> M&apos;inscrire</a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
