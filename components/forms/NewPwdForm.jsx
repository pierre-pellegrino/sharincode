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
import { EyeIcon } from "components/icons";
import { EyeOffIcon } from "components/icons";
import { useAtom } from "jotai";
import { userAtom } from "store";

const NewPwdForm = ({token}) => {
  const router = useRouter();

  const errors = useRef();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [btnValue, setBtnValue] = useState("Éditer mon mot de passe");

  const [_, setUser] = useAtom(userAtom);

  const canSave = [validPwd].every(
    Boolean
  );

  useEffect(() => {
    setErrMsg("");
  }, [pwd]);


  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!canSave) return setErrMsg("Un (ou plusieurs) champs sont invalides !");

    setBtnValue("Édition en cours...");

    const data = {
      user: {
        reset_password_token: token,
        password: pwd
      }
    }

    try {
      const response = await APIManager.forgottenPassword(data);
      
      setSuccess(true);
      setUser(response.data);
      router.push("/");
    } catch (err) {
      setBtnValue("éditer mon mot de passe");

      setErrMsg("Oups ! Pas de réponse du serveur...");
      errors.current.focus();
    }
  };

  return (
    <form className={`${form} ${pwdForm}`} onSubmit={handleEdit}>
      <h3> Nouveau mot de passe </h3>

      {success && (
        <p>
          Votre nouveau mot de passe est enregistré !<br />
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

export default NewPwdForm;