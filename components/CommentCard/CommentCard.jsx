import React from 'react';
import {
  commentWrapper,
  commentUser
} from './comment_card.module.scss';
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import {formatDistanceToNow} from 'date-fns';
import {en, fr} from 'date-fns/locale'

const CommentCard = ({comment}) => {
  const {content, created_at, avatar, username} = comment;
  return (
    <div className={commentWrapper}>
      <div className={commentUser}>
        <ProfileIcon user={comment}/>
        <p>{formatDistanceToNow(new Date(created_at), {addSuffix: true, locale: fr})}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default CommentCard;