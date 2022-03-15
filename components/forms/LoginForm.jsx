import { useRef } from 'react';
import { form, inputWrapper, input, btn } from './form.module.scss';

const LoginForm = () => {

  const email = useRef();
  const pwd = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email.current?.value,
        password: pwd.current?.value,
      },
    };

    // connection
    console.log("On se connecte");
  };

  return (
    <form className={form} onSubmit={handleLogin}>
      <h1> Connexion </h1>

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
        value="Me connecter"
      />
    </form>
  );
};

export default LoginForm;