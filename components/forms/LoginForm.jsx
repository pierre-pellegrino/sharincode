import { EMAIL_REGEX, PWD_REGEX } from "lib/constants/validations";
import { useRef, useEffect, useState } from "react";
import { form, inputWrapper, input, btn, errmsg, offscreen } from "./form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const errors = useRef();

  const email = useRef();
  const pwd = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const canSave = [validEmail, validPwd].every(Boolean);

  useEffect(() => {
    email.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email.current?.value, pwd.current?.value]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email.current?.value,
        password: pwd.current?.value,
      },
    };

    try {
      const response = await APIManager.login(data);
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
          ref={email}
          autoComplete="email"
          required
        />
        <label htmlFor="email-input">Email</label>
      </div>

      <div className={inputWrapper}>
        <input
          type="password"
          className={input}
          id="password-input"
          placeholder=" "
          ref={pwd}
          autoComplete="current-password"
          required
        />
        <label htmlFor="password-input">Mot de passe</label>
      </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="Me connecter"
        disabled={!canSave}
      />
    </form>
  );
};

export default LoginForm;
