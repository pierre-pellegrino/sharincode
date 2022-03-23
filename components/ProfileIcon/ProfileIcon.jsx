import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { 
  profileIcon, 
  profileIconPicture, 
  profileIconText, 
  profilePage,
  profileAsVisitor,
  showOnHover,
} from './profile_icon.module.scss';
import Link from 'next/link';
import {useAtom} from "jotai";
import {isConnectedAtom} from "store";
import SignUpModal from "components/SignUpModal/SignUpModal";

const ProfileIcon = ({user, type}) => {
  const [isConnected] = useAtom(isConnectedAtom);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;

    const handleClick = () => setModalOpen(false);

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [modalOpen]);

  if (!isConnected) {
    return (
      <div className={`${profileIcon} ${type && profilePage} ${profileAsVisitor}` } onClick={() => setModalOpen(true)}>
        {modalOpen && <SignUpModal user={user?.username || user?.user.username || "cet utilisateur"}/>}
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
  }
  else {
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
  }
};

export default ProfileIcon;