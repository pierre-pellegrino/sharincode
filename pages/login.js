import { getAbsoluteURL } from 'lib/getAbsoluteURL';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import { useRouter } from 'next/router';
import LoginForm from '../components/forms/LoginForm';
import styles from '/styles/Home.module.scss';
import { useTranslation } from "next-i18next";

const Login = () => {
  const router = useRouter();
  const { t } = useTranslation("login");

  return (
    <div className={styles.container}>
      <Head>
        <title>{t("title")}</title>
        <meta name="title" content={t("title")} />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content={t("title")} />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta property="twitter:title" content={t("title")} />
      </Head>

      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "login", "forms"])),
  },
});

