import { USERNAME_REGEX } from 'lib/contants';
import { useEffect, useRef, useState } from 'react';
import { form, inputWrapper, input, btn } from './form.module.scss';

const LoginForm = () => {
  const errors = useRef();
  
  const username = useRef();
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const email = useRef();
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const pwd = useRef();
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const pwdConfirm = useRef();
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    username.current.focus();
  }, []);

  const usernameValidation = () => {
    const result = USERNAME_REGEX.test(username.current.value);
    console.log(username.current.value, result);
    setValidUsername(result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        username: username.current?.value.toLowerCase(),
        email: email.current?.value,
        password: pwd.current?.value,
      },
    };

    // connection
    console.log("Inscription");
  };

  return (
    <form className={form} onSubmit={handleLogin}>
      <h1> Inscription </h1>

        <div className={inputWrapper}>
          <input
            type="text"
            className={input}
            id="username-input"
            placeholder=" "
            ref={username}
            autoComplete="off"
            aria-describedby="Identifiant Unique de l'utilisateur"
            onChange={usernameValidation}
          />
          <label htmlFor="username-input">Nom d&apos;utilisateur</label>
        </div>

        <div className={inputWrapper}>
          <input
            type="text"
            className={input}
            id="email-input"
            placeholder=" "
            ref={email}
            autoComplete="email"
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
            autoComplete="new-password"
          />
          <label htmlFor="password-input">Mot de passe</label>
        </div>

        <div className={inputWrapper}>
          <input
            type="password"
            className={input}
            id="passwordConfirm-input"
            placeholder=" "
            ref={pwdConfirm}
            autoComplete="off"
          />
          <label htmlFor="passwordConfirm-input">Confirmation du mot de passe</label>
        </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="M&apos;inscrire"
      />
    </form>
  );
};

export default LoginForm;
