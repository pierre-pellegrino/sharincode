import styles from "styles/Home.module.scss";
import Loader from "components/Loader";
import PostCard from "components/PostCard/PostCard";
import { useRouter } from "next/router";
import { useState } from "react";
import APIManager from "./api/axios";
import Head from "next/head";
import { getAbsoluteURL } from "lib/getAbsoluteURL";

const Search = () => {
  const router = useRouter();
  const { query } = router;
  const [previousQuery, setPreviousQuery] = useState({});
  const [posts, setPosts] = useState();

  const searchQuery = async () => {
    try {
      const response = await APIManager.search(query["q"]);
      setPosts(response.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  if (query !== {} && query !== previousQuery) {
    setPreviousQuery(query);
    searchQuery();
  }

  let content = <Loader />;

  if (posts) {
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

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta property="twitter:title" content="Recherche | Snipshare" />
      </Head>
      <div className={styles.main}>
        Résultats de la recherche : {router.query["q"]}
        {content}
      </div>
    </>
  );
};

export default Search;
