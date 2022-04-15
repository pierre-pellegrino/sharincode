import { getAbsoluteURL } from "lib/getAbsoluteURL";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import RegisterForm from "../components/forms/RegisterForm";
import styles from "/styles/Home.module.scss";

const Register = () => {
  const router = useRouter();
  const { t } = useTranslation("register");

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
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "register", "forms"])),
  },
});
