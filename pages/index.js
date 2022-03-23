import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "../components/Loader";
import { useEffect, useRef, useState } from "react";
import FetchPostsPage from 'components/FetchPostsPage/FetchPostsPage';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const page = 1;
  const { data, error, isValidating, mutate } = useSWR(
    `/posts?page=${page}`,
    APIManager.fetcher
  );

  const bottomRef = useRef(null);
  const observerOptions = {
    rootMargin: '0px',
    threshold: 1
  }

  const observerCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (bottomRef.current) observer.observe(bottomRef.current);

    isVisible && observer.unobserve(bottomRef.current);

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    }
  }, [bottomRef, observerOptions, isVisible])

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
        
        {data.posts.map((post) => {
          return <PostCard post={post.post} key={post.post.id} />   
        })}

        <div ref={bottomRef}></div>
        {isVisible && <FetchPostsPage page={page+1} />}
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
