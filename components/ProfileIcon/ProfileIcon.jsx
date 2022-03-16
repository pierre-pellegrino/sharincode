import Image from 'next/image';
import React from 'react';
import { 
  profileIcon, 
  profileIconPicture, 
  profileIconText, 
  profilePage
} from './profile_icon.module.scss';

const ProfileIcon = ({type}) => {
  return (
    <div className={`${profileIcon} ${type && profilePage}`}>
      <div className={profileIconPicture}>
        <Image 
          src="/profile.jpeg"
          alt="profile picture"
          height={type ? 128 : 48}
          width={type ? 128 : 48}
        />
      </div>
      <div className={`${type && profileIconText}`}>
        <p>Pseudonyme</p>
      </div>
      
    </div>
  );
};

export default ProfileIcon;