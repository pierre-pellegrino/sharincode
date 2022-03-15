import React from 'react';
import { profileIcon, profileIconPicture, profileIconText } from './profile_icon.module.scss';

const ProfileIcon = () => {
  return (
    <div className={profileIcon}>
      <div className={profileIconPicture}>
        <img 
          src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="profile picture"
        />
      </div>
      <div className={profileIconText}>
        <p>Pseudonyme</p>
      </div>
      
    </div>
  );
};

export default ProfileIcon;