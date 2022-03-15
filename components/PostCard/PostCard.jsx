import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { postCardWrapper, top, snippet, bottom, btnsWrapper, btn, reactsWrapper, reacts, comments } from './post_card.module.scss';

const PostCard = () => {
  return (
    <div className={postCardWrapper}>
      <div className={top}>
        <ProfileIcon />
        <p>Posté il y a 3 heures.</p>
      </div>
      <div className={snippet}>
        {/* A ajouter quand le système de snippets sera prêt */}
        <p> Snippet </p>
      </div>
      <div className={bottom}>
        <div className={reactsWrapper}>
          <div className={reacts}>
            <p>5 💡</p>
            <p>3 ❤</p>
            <p>12 🚀</p>
          </div>
          <div className={comments}>
            <p>2 commentaires</p>
          </div>
        </div>
        <div className={btnsWrapper}>
          <p className={btn}>Réagir</p>
          <p className={btn}>Commenter</p>
          <p className={btn}>Partager</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;