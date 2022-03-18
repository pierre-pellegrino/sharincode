import React from 'react';
import {
  commentWrapper,
  commentUser,
  commentHeader
} from './comment_card.module.scss';
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import {formatDistanceToNow} from 'date-fns';
import {en, fr} from 'date-fns/locale'
import Image from 'next/image';

const CommentCard = ({comment}) => {
  const {content, created_at, username, avatar} = comment;
  return (
    <div className={commentWrapper}>
      <Image 
        src={avatar ?? "/profile.jpeg"}
        alt="Profile Picture"
        height={48}
        width={48}
      />
      <div className={commentUser}>
        <div className={commentHeader}>
          <p>{username || "Pseudonyme"}</p>
          <p>{formatDistanceToNow(new Date(created_at), {addSuffix: true, locale: fr})}</p>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;