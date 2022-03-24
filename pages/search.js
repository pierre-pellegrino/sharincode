import styles from "styles/Home.module.scss";
import Loader from "components/Loader";
import PostCard from "components/PostCard/PostCard";
import { useRouter } from "next/router";
import { useState } from "react";
import APIManager from "./api/axios";

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
    content = posts.map((post) => <PostCard post={post.post} key={post.post.id} />);
  }

  return (
    <div className={styles.main}>
      Résultats de la recherche : {router.query["q"]}
      {content}
    </div>
  );
}

export default Search;
