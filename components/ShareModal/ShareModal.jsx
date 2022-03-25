import React from 'react';
import {
  btn,
  openShareModal,
  shareModal,
  shareIcon,
} from "components/PostCard/post_card.module.scss";
import {
  TwitterIcon,
  FacebookIcon
} from "components/icons";

const ShareModal = ({author, language, id}) => {
  const formattedAuthor = escape(author.username);
  const formattedLanguage = escape(language);
  return (
      <div className={`${btn} ${openShareModal}`}>
        <p>Partager</p>
        <div className={shareModal}>
          <a 
            target="_blank" 
            rel="noreferrer" 
            href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fsnipsha.re%2Fposts%2F${id}&text=Snippet%20de%20${formattedAuthor}%20sur%20Snipshare&hashtags=snipshare,${formattedLanguage}`}
            className={shareIcon}
          >
            <TwitterIcon /> 
          </a>
          <a
            target="_blank" 
            rel="noreferrer" 
            href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fsnipsha.re%2Fposts%2F${id}`}
            className={shareIcon}
          >
            <FacebookIcon /> 
          </a>
        </div>
      </div>
  );
};

export default ShareModal;