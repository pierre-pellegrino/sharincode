import {
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
  pwdForm
} from "./form.module.scss";
import cn from "classnames";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import ValidationIcon from "components/ValidationIcon";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { EyeIcon } from "components/icons";
import { EyeOffIcon } from "components/icons";

const EditUserImportantInfos = ({user}) => {
  const router = useRouter();

  const errors = useRef();

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

  const [btnValue, setBtnValue] = useState("Éditer mon mot de passe");

  const canSave = [validPwd, validPwdConfirm].every(
    Boolean
  );

  const [_, setUser] = useAtom(userAtom);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, pwdConfirm]);


  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwdConfirm);
    setValidPwdConfirm(result);
  }, [pwdConfirm]);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg("Un (ou plusieurs) champs sont invalides !");

    setBtnValue("Édition en cours...");

    const data = {
      user: {
        email: user.email,
        current_password: pwd,
        password: pwdConfirm
      }
    }

    try {
      const response = await APIManager.updatePwd(data);
      
      setSuccess(true);
      setUser(response.data);
      router.push("/");
    } catch (err) {
      setBtnValue("éditer mon mot de passe");

      if (!err?.response) {
        setErrMsg("Oups ! Pas de réponse du serveur...");
      } else {
        setErrMsg(err.response.data.error.message);
      }
      errors.current.focus();
    }
  };

  return (
    <form className={`${form} ${pwdForm}`} onSubmit={handleEdit}>
      <h3> Modifier mon mot de passe </h3>

      {success && (
        <p>
          Édition réussie !<br />
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
        <label htmlFor="password-input">Mot de passe actuel</label>
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
          Nouveau mot de passe
        </label>
        <ValidationIcon isValid={validPwdConfirm} />
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

    </form>
  );
};

export default EditUserImportantInfos;