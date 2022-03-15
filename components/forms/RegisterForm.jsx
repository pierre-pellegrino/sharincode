import { useRef } from 'react';
import { form, inputWrapper, input, btn } from './form.module.scss';

const LoginForm = () => {

  const email = useRef();
  const pwd = useRef();
  const username = useRef();

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
          />
          <label htmlFor="password-input">Mot de passe</label>
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