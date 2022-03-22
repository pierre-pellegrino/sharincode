import Loader from "components/Loader";
import NewPostForm from "components/NewPostModal/NewPostForm";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import APIManager from "pages/api/axios";
import { useEffect, useState } from "react";
import { userAtom } from "store";
import styles from "styles/Home.module.scss";
import useSWR from "swr";

const CommentEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/posts/${id}`, APIManager.fetcher);

  const [currentUser] = useAtom(userAtom);
  const [userChecked, setUserChecked] = useState(false);
  
  useEffect(() => {
    if (!data) return;
    
    const user = data.post.user;
    if (currentUser && user.user_id !== currentUser.user.id) {
      return router.replace("/");
    }
    
    if (currentUser) setUserChecked(true);
  }, [currentUser, data, router]);
  
  if (!userChecked || !data) {
    return (
      <div className={styles.main}>
        <Loader />
      </div>
    );
  }

  const { description, snippets, user } = data?.post;
  
  return (
    <NewPostForm
      editDescription={description}
      editLanguage={snippets[0].language}
      editSnippet={snippets[0].content}
      post={data.post}
    />
  );
};

export default CommentEdit;
