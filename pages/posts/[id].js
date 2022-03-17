import React from 'react';
import APIManager from 'pages/api/axios';
import PostCard from 'components/PostCard/PostCard';
import styles from "styles/Home.module.scss";
import Head from "next/head";
import CommentsSection from '../../components/CommentsSection/CommentsSection';

const PostDetailPage = ({id, data, username}) => {
  const {post} = data;
  console.log(post)
  return (
    <main className={styles.main}>
      <Head>
        {/* Put user name BELOW */}
        <title>{username ?? "User"}&apos;s snippet | SnipShare</title>
      </Head>

      <PostCard 
        // language={"JavaScript"}
        //  Working except for Sass like wtf
        language={post.snippets[0]?.language.replace('[', '').replace(']', '').replaceAll('"', '')}
        description={post.description}
        snippet={post.snippets[0]?.content || "There is no code yet."}
        key={post.id}
        date={post.created_at}
        author={post.user}
        detail={true}
      />
        <CommentsSection />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await APIManager.getPost(id);
  console.log(response.data)
  const data = await response.data;

  return {
    props: {
      id,
      data
    }
  }
}

export default PostDetailPage;