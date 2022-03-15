import { useAtom } from "jotai";
import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import { showNewPostModalAtom } from "store";
import styles from "styles/Home.module.css";
import NewPostModal from "components/NewPostModal";
import fakeData from "lib/posts.json";

export default function Home() {
  const [showNewPostModal] = useAtom(showNewPostModalAtom);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | SnipShare</title>
        <meta name="description" content="SnipShare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showNewPostModal && <NewPostModal />}

      <main className={styles.main}>
        {fakeData.posts.map((post) => (
          <PostCard
            language={post.language}
            description={post.description}
            snippet={post.snippet}
            key={post.id}
          />
        ))}
      </main>
    </div>
  );
}
