import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | SnipShare</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  );
};

export default Login;