import { main } from "styles/Home.module.scss";
import Loader from "components/Loader";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import APIManager from "./api/axios";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { loader } from "styles/Home.module.scss";
import Head from "next/head";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import EditUserImportantInfos from "components/forms/EditUserImportantInfos";

const GhRedirect = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <Head>
        <title>New Password | Snipshare</title>
        <meta name="title" content="New Password | Snipshare" />

        <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
        <meta property="og:title" content="New Password Redirection | Snipshare" />

        <meta
          property="twitter:url"
          content={getAbsoluteURL(router.asPath)}
        />
        <meta
          property="twitter:title"
          content="New Password Redirection | Snipshare"
        />
      </Head>
      <div className={main}>
        <EditUserImportantInfos user={user} />
      </div>
    </>
  );
};

export default GhRedirect;
