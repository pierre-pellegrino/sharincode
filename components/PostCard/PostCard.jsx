import { ApprovalIcon, LikeIcon, IdeaIcon } from "components/icons";
import React from "react";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import SnippetHighlighter from "../SnippetHighlighter/SnippetHighlighter";
import {
  postCardWrapper,
  top,
  snippet as snippetStyle,
  bottom,
  btnsWrapper,
  btn,
  reactsWrapper,
  reacts,
  comments,
  openReacts,
  reactsModal,
} from "./post_card.module.scss";

const PostCard = ({ language, snippet, description, theme }) => {
  return (
    <div className={postCardWrapper}>
      <div className={top}>
        <ProfileIcon />
        <p>Posté il y a 3 heures.</p>
      </div>
      {description}
      <div className={snippetStyle}>
        {/* {snippet} */}
        <SnippetHighlighter 
          snippet={snippet} 
          language={language} 
          theme={theme}
        />
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
          <div className={`${btn} ${openReacts}`}>
            <p>Réagir</p>
            <div className={reactsModal}>
              <IdeaIcon />
              <LikeIcon />
              <ApprovalIcon />
            </div>
          </div>
          <p className={btn}>Commenter</p>
          <p className={btn}>Partager</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
