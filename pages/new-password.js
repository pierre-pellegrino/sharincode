import { main } from "styles/Home.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import NewPwdForm from "components/forms/NewPwdForm";

const GhRedirect = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <Head>
        <title>New Password | Snipshare</title>
        <meta name="title" content="Nouveau mot de passe | Snipshare" />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="Nouveau mot de passe | Snipshare" />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta
          property="twitter:title"
          content="Nouveau mot de passe | Snipshare"
        />
      </Head>
      <div className={main}>
        <NewPwdForm token={query.reset_token} />
      </div>
    </>
  );
};

export default GhRedirect;
