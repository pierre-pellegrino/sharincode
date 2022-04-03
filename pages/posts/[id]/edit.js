import Loader from "components/Loader";
import NewPostForm from "components/NewPostModal/NewPostForm";
import { useAtom } from "jotai";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import APIManager from "pages/api/axios";
import { useEffect, useState } from "react";
import { userAtom } from "store";
import styles from "styles/Home.module.scss";
import useSWR from "swr";

const CommentEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(`/posts/${id}`, APIManager.fetcher);

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

  const { description, snippets } = data?.post;

  return (
    <>
      <Head>
        <title>
          Edit {data.post?.user?.username ?? "User"}&apos;s snippet | Snipshare
        </title>
        <meta
          name="title"
          content={`Edit ${data.post?.user?.username ?? "User"}'s snippet | Snipshare`}
        />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta
          property="og:title"
          content={`Edit ${data.post?.user?.username ?? "User"}'s snippet | Snipshare`}
        />

        <meta property="twitter:url" content={getAbsoluteURL(router.asPath)} />
        <meta
          property="twitter:title"
          content={`Edit ${data.post?.user?.username ?? "User"}'s snippet | Snipshare`}
        />
      </Head>
      <NewPostForm
        editDescription={description}
        editSnippets={snippets}
        post={data.post}
      />
    </>
  );
};

export default CommentEdit;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "post-editor"])),
  },
});
