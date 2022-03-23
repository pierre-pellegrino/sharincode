import PostCard from "components/PostCard/PostCard";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "/components/Loader";
import { useEffect, useRef, useState } from "react";

const FetchPostsPage = ({page}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, error } = useSWR(
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
      if (data.posts.length == 0) content = "";
      else {
        content = (
          <>          
            {data.posts.map((post) => (
              <PostCard post={post.post} key={post.post.id} page={page} />
            ))}
    
            <div ref={bottomRef}></div>
            {isVisible && <FetchPostsPage page={page+1} />}
          </>
        );
      }
    }
  
    return (
      <>
        {content}
      </>
    );
};

export default FetchPostsPage;