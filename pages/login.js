import { getAbsoluteURL } from 'lib/getAbsoluteURL';
import Head from 'next/head'
import { useRouter } from 'next/router';
import LoginForm from '../components/forms/LoginForm';
import styles from '/styles/Home.module.scss';

const Login = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Me Connecter | SnipShare</title>
        <meta name="title" content="Me Connecter | Snipshare" />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="Me Connecter | Snipshare" />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta property="twitter:title" content="Me Connecter | Snipshare" />
      </Head>

      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;