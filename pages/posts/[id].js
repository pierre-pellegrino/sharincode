import React from 'react';
import APIManager from 'pages/api/axios';
import PostCard from 'components/PostCard/PostCard';
import styles from "styles/Home.module.scss";
import Head from "next/head";
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import useSWR from 'swr';
import Loader from 'components/Loader';

const PostDetailPage = ({ id, data }) => {
  const { post } = data;

  const {
    data: comments,
    error
  } = useSWR(`/posts/${id}/comments`, APIManager.fetcher);

  let commentsSection = <Loader />;

  if (error) commentsSection = <p>Erreur de chargement des commentaires.</p>;

  if (comments) {
    commentsSection = (
      <CommentsSection
        comments={comments.comments}
        id={post.id}
      />
    );
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>{post.user.username ?? "User"}&apos;s snippet | SnipShare</title>
      </Head>

      <PostCard
        post={post}
        key={post.id}
        detail={true}
      />

      {commentsSection}
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await APIManager.getPost(id);
  const data = await response.data;

  return {
    props: {
      id,
      data
    }
  }
}

export default PostDetailPage;