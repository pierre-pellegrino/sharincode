import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {
  commentsSectionWrapper
} from './comments_section.module.scss';
import {useAtom} from 'jotai';
import {userAtom} from 'store';

const CommentsSection = ({comments}) => {
  const [currentUser] = useAtom(userAtom);

  return (
    <div className={commentsSectionWrapper}>
      {currentUser && <NewCommentForm currentUser={currentUser}/>}

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