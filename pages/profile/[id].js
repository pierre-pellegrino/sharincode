import React from 'react';
import styles from '/styles/Home.module.scss';
import Head from 'next/head';
import ProfileIcon from '/components/ProfileIcon/ProfileIcon';
import APIManager from 'pages/api/axios';
import useSWR from 'swr';
import Loader from "components/Loader";
import ProfileTabMenu from '../../components/ProfileTabMenu/ProfileTabMenu';
import {useAtom} from "jotai";
import {userAtom} from "store";


const ProfilePage = ({id}) => {

  const { data, error } = useSWR(`profiles/${id}`, APIManager.fetcher);
  const [userData] = useAtom(userAtom);

  let content = <Loader />;

  if (error) content = <div>Oups ! Il y a eu un problème...</div>;

  if (data) {
    const profileData = {avatar: data.avatar, username: data.user.username}
    const isCurrentUser = userData && userData.user.id === data.user.id;
    content = (
      <>
        <Head>
          <title>{data.user.username} | SnipShare</title>
        </Head>
        <ProfileIcon type="profile" user={profileData}/>
        <ProfileTabMenu user={data.user} isCurrentUser={isCurrentUser} currentUser={userData.user} />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SnipShare</title>
      </Head>

      <main className={styles.main}>
        {content}
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: {
      id,
    }
  }
}

export default ProfilePage;