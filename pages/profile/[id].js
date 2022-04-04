import React from "react";
import styles from "/styles/Home.module.scss";
import Head from "next/head";
import ProfileIcon from "/components/ProfileIcon/ProfileIcon";
import APIManager from "pages/api/axios";
import useSWR from "swr";
import Loader from "components/Loader";
import ProfileTabMenu from "../../components/ProfileTabMenu/ProfileTabMenu";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { profileInfos, infosContainer } from "./profile.module.scss";
import { useRouter } from "next/router";
import { getAbsoluteURL } from "lib/getAbsoluteURL";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(`profiles/${id}`, APIManager.fetcher);
  const [userData] = useAtom(userAtom);
  const { t: common } = useTranslation("common");
  const { t } = useTranslation("profile");

  let content = <Loader />;

  if (error) content = <div>{common("serverError")}</div>;

  if (data) {
    const profileData = { avatar: data.avatar, username: data.user.username };
    const isCurrentUser = userData && userData.user.id === data.user.id;
    content = (
      <>
        <Head>
          <title>{data.user.username} | Snipshare</title>
          <meta name="title" content={`${data.user.username} | Snipshare`} />

          <meta property="og:url" content={getAbsoluteURL(router.asPath)} />
          <meta
            property="og:title"
            content={`${data.user.username} | Snipshare`}
          />

          <meta
            property="twitter:url"
            content={getAbsoluteURL(router.asPath)}
          />
          <meta
            property="twitter:title"
            content={`${data.user.username} | Snipshare`}
          />
        </Head>
        <div className={infosContainer}>
          <ProfileIcon type="profile" user={profileData} />
          <div className={profileInfos}>
            <p>Description&nbsp;: {data.user.description}</p>
            <p>
              Github&nbsp;:
              <a href={data.user.github_url} target="_blank" rel="noreferrer">
                {data.user.github_url}
              </a>
            </p>
            <p>
              {t("personalLink")}&nbsp;:
              <a href={data.user.personal_url} target="_blank" rel="noreferrer">
                {data.user.personal_url}
              </a>
            </p>
          </div>
        </div>
        <ProfileTabMenu
          user={data.user}
          isCurrentUser={isCurrentUser}
          currentUser={userData && userData.user}
          userAvatar={userData && userData.avatar}
          mutate={mutate}
          posts={data.posts}
          favoritePosts={data.favorite_posts}
        />
      </>
    );
  }

  return (
    <>
      <main className={styles.main}>{content}</main>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "common",
      "profile",
      "post-editor",
      "forms",
      "edit-profile",
      "edit-email",
      "edit-pwd",
    ])),
  },
});
