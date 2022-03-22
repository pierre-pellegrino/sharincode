import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "../components/Loader";

export default function Home() {
  const page = 1;
  const { data, error, isValidating, mutate } = useSWR(
    `/posts?page=${page}`,
    APIManager.fetcher
  );

  let content = <Loader />;

  if (error) content = <div>Oups ! Il y a eu un problème...</div>;

  if (data) {
    content = (
      <>
        <button
          className={`${styles.btn} bg-primary txt-btn`}
          onClick={() => mutate()}
          disabled={isValidating}
        >
          Rafraichir
        </button>
        
        {data.posts.map((post) => (
          <PostCard post={post.post} key={post.post.id} />
        ))}
      </>
    );
  }

  return (
    <section className={styles.main}>
      <Head>
        <title>Home | SnipShare</title>
        <meta name="description" content="SnipShare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Accueil</h1>
      {content}
    </section>
  );
}
