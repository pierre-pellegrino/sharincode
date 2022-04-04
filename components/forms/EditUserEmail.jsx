import {
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
  showPwdIcon,
  pwdForm,
} from "./form.module.scss";
import cn from "classnames";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { InfoIcon } from "components/icons";
import ValidationIcon from "components/ValidationIcon";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { EyeIcon } from "components/icons";
import { EyeOffIcon } from "components/icons";
import { useTranslation } from "next-i18next";

const EditUserEmail = () => {
  const router = useRouter();
  const { t } = useTranslation(["edit-email", "forms"]);
  const { t: common } = useTranslation("common");

  const errors = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [btnValue, setBtnValue] = useState(t("edit"));

  const canSave = [validEmail, validPwd].every(
    Boolean
  );

  const [_, setUser] = useAtom(userAtom);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg(common("cantSaveError"));

    const data = {
      user: {
        email: email,
        current_password: pwd,
      },
    };

    try {
      setBtnValue(t("savingBtn"))
      const response = await APIManager.updateEmail(data);
      setSuccess(true);
      setUser(response.data);
      router.push("/");
    } catch (err) {
      setBtnValue(t("edit"));

      if (!err?.response) {
        setErrMsg(common("serverError"));
      } else {
        setErrMsg(err.response.data.error.message);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={`${form} ${pwdForm}`} onSubmit={handleLogin}>

    <h3>{t("title")}</h3>

      {success && (
        <p>
          {t("success")}<br />
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
          id="email-input2"
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
        <label htmlFor="email-input2">{t("forms:newEmail.value")}</label>
        <ValidationIcon isValid={validEmail} />
        <p
          id="emailnote"
          className={cn(instructions, {
            [offscreen]: !(emailFocus && email && !validEmail),
          })}
        >
          <InfoIcon />
          {t("forms:newEmail.instructions")}
        </p>
      </div>

      <div className={inputWrapper}>
        <input
          type={showPwd ? "text" : "password"}
          className={`${input} ${inputPwd}`}
          id="password-input2"
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
        <label htmlFor="password-input2">{t("forms:pwdConfirm.value")}</label>
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
          <InfoIcon />
          {t("forms:pwdConfirm.instructions")}
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
    </form>
  );
};

export default EditUserEmail;
