import Image from 'next/image';
import React from 'react';
import { 
  profileIcon, 
  profileIconPicture, 
  profileIconText, 
  profilePage
} from './profile_icon.module.scss';

const ProfileIcon = ({user, type}) => {
  return (
    <div className={`${profileIcon} ${type && profilePage}`}>
      <div className={profileIconPicture}>
        <Image 
          src={ user && user.avatar || "/profile.jpeg"}
          alt="Profile Picture"
          height={type ? 128 : 48}
          width={type ? 128 : 48}
        />
      </div>
      <div className={profileIconText}>
        <p>{user?.username || user?.user.username || "Pseudonyme"}</p>
      </div>
      
    </div>
  );
};

export default ProfileIcon;