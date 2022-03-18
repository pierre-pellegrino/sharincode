import React from 'react';
import APIManager from 'pages/api/axios';
import PostCard from 'components/PostCard/PostCard';
import styles from "styles/Home.module.scss";
import Head from "next/head";
import CommentsSection from '../../components/CommentsSection/CommentsSection';

const PostDetailPage = ({ id, data }) => {
  const { post } = data;
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

      <CommentsSection
        comments={post.comments}
        id={post.id}
      />
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