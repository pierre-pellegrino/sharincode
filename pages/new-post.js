import NewPostForm from "components/NewPostModal/NewPostForm";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import Head from "next/head";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Nouveau Snippet | SnipShare</title>
        <meta name="title" content="Nouveau Snippet | Snipshare" />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="Nouveau Snippet | Snipshare" />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta property="twitter:title" content="Nouveau Snippet | Snipshare" />
      </Head>
      <NewPostForm />
    </>
  );
};

export default NewPost;
