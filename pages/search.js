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

const Search = () => {
  const router = useRouter();
  const { query } = router;
  const [previousQuery, setPreviousQuery] = useState({});

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
    content = <div>Oups ! Une erreur est survenue...</div>;
  }

  if (data) {
    const { posts } = data;

    content = posts.map((post) => (
      <PostCard post={post.post} key={post.post.id} />
    ));
  }

  return (
    <>
      <Head>
        <title>Recherche | Snipshare</title>
        <meta name="title" content="Recherche | Snipshare" />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="Recherche | Snipshare" />

        <meta property="twitter:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="twitter:title" content="Recherche | Snipshare" />
      </Head>
      <div className={styles.main}>
        Résultats de la recherche : {router.query["q"]}
        <Link href="/">
          <a className="txt-primary"> Annuler la recherche </a>
        </Link>
        {content}
      </div>
    </>
  );
};

export default Search;
