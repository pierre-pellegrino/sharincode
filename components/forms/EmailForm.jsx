import React, { useEffect, useRef, useState } from 'react';
import APIManager from "pages/api/axios";
import {
  form,
  inputWrapper,
  input,
  btn,
} from "./form.module.scss";

const EmailForm = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [btnMsg, setBtnMsg] = useState("renvoyer");
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleForgottenPwd = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email
      }
    }
    try {
      setBtnMsg("envoi en cours...");
      setDisableBtn(true);
      const response = await APIManager.forgottenPassword(data);
      setSuccess(true);
    }
    catch (err) {
      console.log("Oups ! Pas de réponse du serveur...");
    }
    setBtnMsg("renvoyer");
    setDisableBtn(false);
  }

  return (
    <form className={`${form} bg-global-secondary`} onSubmit={handleForgottenPwd}>
      <p> Merci de saisir l&apos;adresse email liée à votre compte. </p>

      {success && (
        <p>
          Un email vous a été envoyé pour vous permettre de choisir un nouveau mot de passe.
        </p>
      )}

      <p>
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

      <input
        className={`${btn} bg-primary txt-btn`}
        type="submit"
        role="button"
        value={btnMsg}
        disabled={disableBtn}
      />

    </form>
  );
};

export default EmailForm;