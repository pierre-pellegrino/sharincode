import React from 'react';
import styles from '/styles/Home.module.scss';
import Head from 'next/head';
import ProfileIcon from '/components/ProfileIcon/ProfileIcon'

const ProfilePage = ({username}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{username} | SnipShare</title>
      </Head>

      <main className={styles.main}>
        <ProfileIcon type="profile"/>
        {username}
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { username } = context.params;

  return {
    props: {
      username
    }
  }
}

export default ProfilePage;