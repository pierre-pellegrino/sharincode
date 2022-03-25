import React from "react";
import APIManager from "pages/api/axios";
import PostCard from "components/PostCard/PostCard";
import styles from "styles/Home.module.scss";
import Head from "next/head";
import CommentsSection from "components/CommentsSection/CommentsSection";
import useSWR from "swr";
import Loader from "components/Loader";
import { useRouter } from "next/router";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import { useEffect, useRef } from "react";

const PostDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const commentRef = useRef();

  useEffect(() => {
    if (commentRef?.current && router.query.comment) commentRef.current.focus();
  }, [commentRef, router.query.comment]);

  const { data: post, error: postError } = useSWR(
    `/posts/${id}`,
    APIManager.fetcher
  );

  const { data: comments, error: commentsError } = useSWR(
    `/posts/${id}/comments`,
    APIManager.fetcher
  );

  let postCard = <Loader />;

  if (postError) postCard = <p>Erreur de chargement du post.</p>;

  let commentsSection = <div></div>;

  if (commentsError)
    commentsSection = <p>Erreur de chargement des commentaires.</p>;

  if (post) {
    commentsSection = <Loader />;

    postCard = <PostCard post={post.post} detail={true} commentRef={commentRef} />;
  }

  if (comments) {
    commentsSection = (
      <CommentsSection
        comments={comments.comments}
        id={id}
        commentRef={commentRef}
      />
    );
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>
          {post?.user?.username ?? "User"}&apos;s snippet | Snipshare
        </title>
        <meta
          name="title"
          content={`${post?.user?.username ?? "User"}'s snippet | Snipshare`}
        />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta
          property="og:title"
          content={`${post?.user?.username ?? "User"}'s snippet | Snipshare`}
        />

        <meta property="twitter:url" content={getAbsoluteURL(router.asPath)} />
        <meta
          property="twitter:title"
          content={`${post?.user?.username ?? "User"}'s snippet | Snipshare`}
        />
      </Head>

      {postCard}

      {commentsSection}
    </main>
  );
};

export default PostDetailPage;
