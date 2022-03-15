import Head from 'next/head'
import RegisterForm from '../components/forms/RegisterForm';
import styles from '../styles/Home.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Register | SnipShare</title>
      </Head>

      <main className={styles.main}>
        <RegisterForm />
      </main>
    </div>
  );
};

export default Login;