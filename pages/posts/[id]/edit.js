import Loader from "components/Loader";
import NewPostForm from "components/NewPostModal/NewPostForm";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import APIManager from "pages/api/axios";
import { useEffect, useState } from "react";
import { userAtom } from "store";
import styles from "styles/Home.module.scss";

const CommentEdit = ({ data }) => {
  const { description, snippets, user } = data.post;
  const [currentUser] = useAtom(userAtom);
  const [userChecked, setUserChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser && user.user_id !== currentUser.user.id) return router.replace("/");
    if (currentUser) setUserChecked(true);
  }, [currentUser, router, user.user_id]);

  if (!userChecked)
    return (
      <div className={styles.main}>
        <Loader />
      </div>
    );

  return (
    <NewPostForm
      editDescription={description}
      editLanguage={snippets[0].language}
      editSnippet={snippets[0].content}
      post={data.post}
    />
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await APIManager.getPost(id);
  const data = await response.data;

  return {
    props: {
      id,
      data,
    },
  };
};

export default CommentEdit;
