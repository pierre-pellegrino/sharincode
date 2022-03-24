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

const ShareModal = () => {
  return (
      <div className={`${btn} ${openShareModal}`}>
        <p>Partager</p>
        <div className={shareModal}>
          <div className={shareIcon}>
            <TwitterIcon /> 
          </div>
          <div className={shareIcon}>
            <FacebookIcon /> 
          </div>
        </div>
      </div>
  );
};

export default ShareModal;