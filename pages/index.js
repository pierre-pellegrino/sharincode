import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "../components/Loader";

export default function Home() {
  const { data, error, isValidating, mutate } = useSWR(
    "/posts",
    APIManager.fetcher
  );

  let content = <Loader />;

  if (error) content = <div>Oups ! Il y a eu un problème...</div>;

  if (data) {
    content = (
      <>
        <button
          className={styles.btn}
          onClick={() => mutate()}
          disabled={isValidating}
        >
          Rafraichir
        </button>
        {data.posts.map((post) => (
          <PostCard
            language={post.post.snippets[0]?.language.replace(
              /^(\[")(.+)("])$/,
              "$2"
            )}
            description={post.post.description}
            snippet={post.post.snippets[0]?.content || "There is no code yet."}
            key={post.post.id}
            date={post.post.created_at}
            author={post.post.user}
            id={post.post.id}
            commentNb={post.post.comments}
          />
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
