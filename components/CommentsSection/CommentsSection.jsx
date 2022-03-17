import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import {
  commentsSectionWrapper
} from './comments_section.module.scss';

const CommentsSection = ({comments}) => {
  return (
    <div className={commentsSectionWrapper}>

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