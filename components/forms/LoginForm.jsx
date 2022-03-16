import { useRef } from 'react';
import { form, inputWrapper, input, btn } from './form.module.scss';
import APIManager from 'pages/api/axios'
import {useRouter} from 'next/router';

const LoginForm = () => {
  const router = useRouter();

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

    try {
      const response = await APIManager.login(data);
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
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
            autoComplete="currentPassword"
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