import Image from 'next/image';
import React from 'react';
import { 
  profileIcon, 
  profileIconPicture, 
  profileIconText, 
  profilePage
} from './profile_icon.module.scss';

const ProfileIcon = ({user, type}) => {
  console.log(user)
  return (
    <div className={`${profileIcon} ${type && profilePage}`}>
      <div className={profileIconPicture}>
        <Image 
          src={ user && user.avatar || "/profile.jpeg"}
          alt="Profile Picture"
          height={48}
          width={48}
        />
      </div>
      <div className={profileIconText}>
        <p>{user.username || user.user.username || "Pseudonyme"}</p>
      </div>
      
    </div>
  );
};

export default ProfileIcon;