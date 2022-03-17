import Image from 'next/image';
import React from 'react';
import { profileIcon, profileIconPicture, profileIconText } from './profile_icon.module.scss';

const ProfileIcon = ({user}) => {
  return (
    <div className={profileIcon}>
      <div className={profileIconPicture}>
        <Image 
          src={ user.avatar ?? "/profile.jpeg"}
          alt="Profile Picture"
          height={48}
          width={48}
        />
      </div>
      <div className={profileIconText}>
        <p>{user.username || "Pseudonyme"}</p>
      </div>
      
    </div>
  );
};

export default ProfileIcon;