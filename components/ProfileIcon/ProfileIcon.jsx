import Image from 'next/image';
import React from 'react';
import { 
  profileIcon, 
  profileIconPicture, 
  profileIconText, 
  profilePage
} from './profile_icon.module.scss';
import Link from 'next/link';

const ProfileIcon = ({user, type}) => {
  return (
    <div className={`${profileIcon} ${type && profilePage}`}>
      <div className={profileIconPicture}>
        {!type ? (
          <Link href={`profile/${user?.user_id ?? ''}`}>
            <a>
              <Image 
                src={ user && user.avatar || "/profile.jpeg"}
                alt="Profile Picture"
                height={type ? 128 : 48}
                width={type ? 128 : 48}
              />
            </a>
          </Link>
        ) : (
          <Image 
            src={ user && user.avatar || "/profile.jpeg"}
            alt="Profile Picture"
            height={type ? 128 : 48}
            width={type ? 128 : 48}
          />
        )}
      </div>
      <div className={profileIconText}>
        {!type ? (
          <Link href={`profile/${user?.user_id ?? ''}`}>
            <a>
              <p>{user?.username || user?.user.username || "Pseudonyme"}</p>
            </a>
          </Link>
        ) : (
          <p>{user?.username || user?.user.username || "Pseudonyme"}</p>
        )}
      </div>
      
    </div>
  );
};

export default ProfileIcon;