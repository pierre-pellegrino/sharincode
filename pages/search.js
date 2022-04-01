import styles from "styles/Home.module.scss";
import Loader from "components/Loader";
import PostCard from "components/PostCard/PostCard";
import { useRouter } from "next/router";
import APIManager from "./api/axios";
import Head from "next/head";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Search = () => {
  const router = useRouter();
  const { query } = router;
  const [previousQuery, setPreviousQuery] = useState({});
  const { t: common } = useTranslation("common");
  const { t } = useTranslation("search");

  const { data, error } = useSWR(query !== {} ? "/posts" : null, () =>
    APIManager.fetcher(`/searches?keywords=${query["q"].replace(" ", "_")}`)
  );

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (query !== {} && query !== previousQuery) {
      setPreviousQuery(query);
      mutate("/posts");
    }
  }, [mutate, previousQuery, query]);

  let content = <Loader />;

  if (error) {
    console.log(error);
    content = <div>{common("serverError")}</div>;
  }

  if (data) {
    const { posts } = data;

    content = posts.map((post) => (
      <PostCard post={post.post} key={post.post.id} locale={router.locale} />
    ));
  }

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="title" content={t("title")} />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content={t("title")} />

        <meta property="twitter:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="twitter:title" content={t("title")} />
      </Head>
      <div className={styles.main}>
        {t("searchResults")} {router.query["q"]}
        <Link href="/">
          <a className="txt-primary">{t("cancelSearch")}</a>
        </Link>
        {content}
      </div>
    </>
  );
};

export default Search;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "search"])),
  },
});
