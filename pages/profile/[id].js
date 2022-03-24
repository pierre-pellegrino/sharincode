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
import { profileInfos } from "./profile.module.scss";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(`profiles/${id}`, APIManager.fetcher);
  const [userData] = useAtom(userAtom);

  let content = <Loader />;

  if (error) content = <div>Oups ! Il y a eu un problème...</div>;

  if (data) {
    const profileData = { avatar: data.avatar, username: data.user.username };
    const isCurrentUser = userData && userData.user.id === data.user.id;
    content = (
      <>
        <Head>
          <title>{data.user.username} | Snipshare</title>
        </Head>
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
            Lien personnel&nbsp;:
            <a href={data.user.personal_url} target="_blank" rel="noreferrer">
              {data.user.personal_url}
            </a>
          </p>
        </div>
        <ProfileTabMenu
          user={data.user}
          isCurrentUser={isCurrentUser}
          currentUser={userData && userData.user}
          userAvatar={userData && userData.avatar}
          mutate={mutate}
          posts={data.posts}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SnipShare</title>
      </Head>

      <main className={styles.main}>{content}</main>
    </>
  );
};

export default ProfilePage;
