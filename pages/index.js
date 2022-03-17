import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import APIManager from "pages/api/axios";

export default function Home({data}) {
  return (
    <section className={styles.main}>
      <Head>
        <title>Home | SnipShare</title>
        <meta name="description" content="SnipShare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Accueil</h1>
      {data.map((post) => (
        <PostCard
          language={"JavaScript"}
          // Modifier les seed pour n'inclure que les langages pris en charge puis décommenter en dessous
          // language={post.snippets[0]?.language}
          description={post.post.description}
          snippet={post.snippets[0]?.content || "There is no code yet."}
          key={post.post.id}
          date={post.post.created_at}
          author={post.post.user_id}
        />
      ))}
    </section>
  );
}

export async function getServerSideProps() {
  const response = await APIManager.getPosts();
  const data = response.data.posts;

  return {
    props: {
      data
    }
  };
}
