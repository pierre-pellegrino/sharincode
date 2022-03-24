import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "../components/Loader";
import { useEffect, useRef, useState } from "react";
import FetchPostsPage from "components/FetchPostsPage/FetchPostsPage";
import { useRouter } from "next/router";
import { getAbsoluteURL } from "lib/getAbsoluteURL";

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const page = 1;
  const { data, error } = useSWR("/posts", () =>
    APIManager.fetcher(`/posts?page=${page}`)
  );

  const bottomRef = useRef(null);
  const observerOptions = {
    rootMargin: "0px",
    threshold: 1,
  };

  const observerCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (bottomRef.current) observer.observe(bottomRef.current);

    isVisible && observer.unobserve(bottomRef.current);

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [bottomRef, observerOptions, isVisible]);

  let content = <Loader />;

  if (error) content = <div>Oups ! Il y a eu un problème...</div>;

  if (data) {
    content = (
      <>
        {data.posts.map((post) => {
          return <PostCard post={post.post} key={post.post.id} page={page} />;
        })}

        <div ref={bottomRef}></div>
        {isVisible && <FetchPostsPage page={page + 1} />}
      </>
    );
  }

  return (
    <section className={styles.main}>
      <Head>
        <title>Home | Snipshare</title>
        <meta name="title" content="Home | Snipshare" />
        <meta
          name="description"
          content="Le réseau social de partage de snippets"
        />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="Home | Snipshare" />
        <meta
          property="og:description"
          content="Le réseau social de partage de snippets"
        />

        <meta property="twitter:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="twitter:title" content="Home | Snipshare" />
        <meta
          property="twitter:description"
          content="Le réseau social de partage de snippets"
        />
      </Head>
      {content}
    </section>
  );
}
