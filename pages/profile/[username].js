import React from 'react';
import styles from '/styles/Home.module.scss';
import Head from 'next/head';
import ProfileIcon from '/components/ProfileIcon/ProfileIcon'
import APIManager from 'pages/api/axios';

const ProfilePage = ({username, user}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{username} | SnipShare</title>
      </Head>

      <main className={styles.main}>
        {/* <ProfileIcon type="profile"/> */}
        {username}
        {user}
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { username } = context.params;

  const response = await APIManager.getProfile(username);
  const user = await response.data;

  return {
    props: {
      username,
      user
    }
  }
}

export default ProfilePage;