import Head from 'next/head'
import LoginForm from '../components/forms/LoginForm';
import styles from '/styles/Home.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | SnipShare</title>
      </Head>

      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;