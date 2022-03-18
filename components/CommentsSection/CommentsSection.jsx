import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {
  commentsSectionWrapper
} from './comments_section.module.scss';
import {useAtom} from 'jotai';
import {userAtom} from 'store';

const CommentsSection = ({comments, id, commentFocus}) => {
  const [currentUser] = useAtom(userAtom);

  return (
    <div className={commentsSectionWrapper}>
      {currentUser && <NewCommentForm currentUser={currentUser} id={id}/>}
      {commentFocus && <p>Lache un com</p>}

      {comments && comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment.id}
            comment={comment.comment}
          />
        )          
      })}
      
    </div>
  );
};

export default CommentsSection;