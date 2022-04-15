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
import { useTranslation } from "next-i18next";

const RegisterForm = () => {
  const router = useRouter();
  const { t } = useTranslation(["register", "forms"]);
  const { t: common } = useTranslation("common");

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

  const [btnValue, setBtnValue] = useState(t("register"));

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

    if (!canSave) return setErrMsg(common("cantSaveError"));

    setBtnValue(t("savingBtn"));

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
      setBtnValue(t("register"));

      if (!err?.response) {
        setErrMsg(common("serverError"));
      } else {
        setErrMsg(err.response.data.error.message);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={`${form} bg-global-secondary`} onSubmit={handleLogin}>
      <h1>{t("register")}</h1>
      <div className={advantages}>
        <p>
          {t("advantages.intro")}&nbsp;:
        </p>
        <ul>
          <li>
            {t("advantages.share")}&nbsp;✨
          </li>
          <li>
            {t("advantages.comment")}&nbsp;✍️
          </li>
          <li>
            {t("advantages.react")}&nbsp;💡
          </li>
          <li>
            {t("advantages.fav")}&nbsp;⭐
          </li>
          <li>
            {t("advantages.theme")}&nbsp;🎨
          </li>
        </ul>
      </div>

      {success && (
        <p>
          {t("registerComplete")}<br />
          {t("redirect")}
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
        <label htmlFor="username-input">{t("forms:username.value")}</label>
        <ValidationIcon isValid={validUsername} />
        <p
          id="uidnote"
          className={cn(instructions, {
            [offscreen]: !(usernameFocus && username && !validUsername),
          })}
        >
          <InfoIcon />
          {t("forms:username.instructions")}
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
        <label htmlFor="email-input">{t("forms:email.value")}</label>
        <ValidationIcon isValid={validEmail} />
        <p
          id="emailnote"
          className={cn(instructions, {
            [offscreen]: !(emailFocus && email && !validEmail),
          })}
        >
          {t("forms:email.instructions")}
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
        <label htmlFor="password-input">{t("forms:pwd.value")}</label>
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
          {t("forms:pwd.instructions")}
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
          {t("forms:pwdConfirm.value")}
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
      <a href={github_url} className={`${btn} ${github} bg-primary txt-btn`}>
        <GithubIcon />
        {t("forms:github")}
      </a>
      <div className={formLink}>
        <span>{t("alreadyRegistered")}</span>
        <Link href="/login">
          <a className="txt-primary"> {t("loginLink")}</a>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
