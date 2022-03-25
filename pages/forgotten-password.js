import Head from 'next/head'
import { useRouter } from 'next/router';
import EmailForm from '../components/forms/EmailForm';
import LoginForm from '../components/forms/LoginForm';
import styles from '/styles/Home.module.scss';

const Login = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Mot de passe oublié | Snipshare</title>
        <meta name="title" content="Mot de passe oublié | Snipshare" />

        <meta property="og:title" content="Mot de passe oublié | Snipshare" />

        <meta
          property="twitter:url"
        />
        <meta property="twitter:title" content="Mot de passe oublié | Snipshare" />
      </Head>

      <main className={styles.main}>
        <EmailForm />
      </main>
    </div>
  );
};

export default Login;