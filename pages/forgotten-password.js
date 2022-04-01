import Head from "next/head";
import EmailForm from "../components/forms/EmailForm";
import styles from "/styles/Home.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ForgottenPwd = () => {
  const { t: common } = useTranslation("common");
  const { t } = useTranslation("forgotten_pwd");

  return (
    <div className={styles.container}>
      <Head>
        <title>{t("title")}</title>
        <meta name="title" content={t("title")} />

        <meta property="og:title" content={t("title")} />

        <meta property="twitter:url" />
        <meta property="twitter:title" content={t("title")} />
      </Head>

      <main className={styles.main}>
        <EmailForm
          instructions={t("instructions")}
          submit_txt={t("submit_txt")}
          sending_message={t("sending_message")}
          success_message={t("success_message")}
          server_error={common("serverError")}
        />
      </main>
    </div>
  );
};

export default ForgottenPwd;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "forgotten_pwd"])),
  },
});
