import { getAbsoluteURL } from "lib/getAbsoluteURL";
import Head from "next/head";
import { useRouter } from "next/router";
import RegisterForm from "../components/forms/RegisterForm";
import styles from "/styles/Home.module.scss";

const Register = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>M&apos;inscrire | SnipShare</title>
        <meta name="title" content="M'inscrire | Snipshare" />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="M'inscrire | Snipshare" />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta property="twitter:title" content="M'inscrire | Snipshare" />
      </Head>

      <main className={styles.main}>
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
