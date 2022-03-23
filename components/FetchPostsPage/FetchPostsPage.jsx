import Head from "next/head";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "/components/Loader";
import { useEffect, useRef, useState } from "react";

const FetchPostsPage = ({page}) => {
    const { data, error, isValidating, mutate } = useSWR(
      `/posts?page=${page}`,
      APIManager.fetcher
    );
  
    const bottomRef = useRef(null);
    const observerOptions = {
      rootMargin: '0px',
      threshold: 1
    }
  
    useEffect(() => {
      const observer = new IntersectionObserver(() => console.log("yo page 2"), observerOptions);
      if (bottomRef.current) observer.observe(bottomRef.current);
  
      return () => {
        if (bottomRef.current) observer.unobserve(bottomRef.current);
      }
    }, [bottomRef, observerOptions])
  
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
  
          <div ref={bottomRef}></div>
        </>
      );
    }
  
    return (
      <>
        <p> héhéhéhé </p>
        {content}
      </>
    );
};

export default FetchPostsPage;