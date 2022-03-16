import { useAtom } from "jotai";
import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import { showNewPostModalAtom } from "store";
import styles from "styles/Home.module.scss";
import NewPostModal from "components/NewPostModal";
import fakeData from "lib/posts.json";

export default function Home() {
  const [showNewPostModal] = useAtom(showNewPostModalAtom);

  return (
    <section className={styles.main}>
      <Head>
        <title>Home | SnipShare</title>
        <meta name="description" content="SnipShare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showNewPostModal && <NewPostModal />}

      <h1>Accueil</h1>

      {fakeData.posts.map((post) => (
        <PostCard
          language={post.language}
          description={post.description}
          snippet={post.snippet}
          key={post.id}
        />
      ))}
    </section>
  );
}
