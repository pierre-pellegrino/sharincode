import React, { useEffect, useRef, useState } from "react";
import APIManager from "pages/api/axios";
import { form, inputWrapper, input, btn } from "./form.module.scss";

const EmailForm = ({
  instructions,
  submit_txt,
  sending_message,
  success_message,
  server_error,
}) => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [btnMsg, setBtnMsg] = useState(submit_txt);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleForgottenPwd = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email,
      },
    };
    try {
      setBtnMsg(sending_message);
      setDisableBtn(true);
      const response = await APIManager.forgottenPassword(data);
      setSuccess(true);
    } catch (err) {
      setErrMsg(server_error);
    }
    setBtnMsg(submit_txt);
    setDisableBtn(false);
  };

  return (
    <form
      className={`${form} bg-global-secondary`}
      onSubmit={handleForgottenPwd}
    >
      <p>{instructions}</p>

      {success && <p>{success_message}</p>}

      <p>{errMsg}</p>

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
