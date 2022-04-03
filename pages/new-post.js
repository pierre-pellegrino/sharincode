import NewPostForm from "components/NewPostModal/NewPostForm";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();
  const { t } = useTranslation("post-editor");

  return (
    <>
      <Head>
        <title>{t("newPostTitle")}</title>
        <meta name="title" content={t("newPostTitle")} />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content={t("newPostTitle")} />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta property="twitter:title" content={t("newPostTitle")} />
      </Head>
      <NewPostForm />
    </>
  );
};

export default NewPost;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "post-editor"])),
  },
});
