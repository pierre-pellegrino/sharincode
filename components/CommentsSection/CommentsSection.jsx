import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {
  commentsSectionWrapper,
  visitorMessage
} from './comments_section.module.scss';
import {useAtom} from 'jotai';
import {userAtom} from 'store';
import Link from "next/link";

const CommentsSection = ({comments, id}) => {
  const [currentUser] = useAtom(userAtom);

  return (
    <div className={commentsSectionWrapper}>
      {currentUser && <NewCommentForm currentUser={currentUser} id={id}/>}
      {!currentUser && <p className={visitorMessage}>
        <Link href="/register">
          <a className="txt-primary">Créez un compte</a>
        </Link> ou&nbsp;
        <Link href="/login">
          <a className="txt-primary">connectez-vous</a>
        </Link>
        &nbsp;pour laisser un commentaire.</p>}

      {comments && comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment.id}
            comment={comment.comment}
            currentUser={currentUser}
            postId={id}
          />
        )          
      })}
      
    </div>
  );
};

export default CommentsSection;