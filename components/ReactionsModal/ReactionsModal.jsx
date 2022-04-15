import React, { useState } from "react";
import {
  btn,
  openReacts,
  reactsModal,
  singleReactWrapper,
  singleReactInfo,
  hidden,
} from "components/PostCard/post_card.module.scss";
import { ApprovalIcon, LikeIcon, IdeaIcon } from "components/icons";
import APIManager from "pages/api/axios";
import { useSWRConfig } from "swr";
import { useAtom } from "jotai";
import { userAtom } from "store";
import { useTranslation } from "next-i18next";

const ReactionsModal = ({
  postId,
  reactions,
  page = 1,
  userId,
  mutate: mutateProfile,
}) => {
  const [currentUser] = useAtom(userAtom);
  const currentUserId = currentUser?.user.id ?? null;
  const currentUserReact = reactions.filter(
    (react) => react.user_id === currentUserId
  );
  const { mutate } = useSWRConfig();
  const [closeReactions, setCloseReactions] = useState(false);
  const { t } = useTranslation();

  const reacts = ["", "Light", "Love", "Check"];

  const handleAddReaction = async (reactIndex) => {
    setCloseReactions(true);
    if (currentUserReact && currentUserReact.length > 0) {
      const deleteReactResponse = await APIManager.deleteReaction(postId);
    }

    const data = {
      name: reacts[reactIndex],
    };

    if (!currentUserReact || currentUserReact[0]?.reaction_id !== reactIndex) {
      const response = await APIManager.addReaction(postId, data);
    }

    mutate("/posts");
    for (let i = 1; i <= page; i++) {
      mutate(`/posts?page=${i}`);
    }
    mutate(`/posts/${postId}`);
    mutate(`profiles/${userId}`);
    if (mutateProfile) mutateProfile();
    setCloseReactions(false);
  };

  return (
    <div className={`${btn} ${openReacts}`}>
      <p>{t("reactBtn")}</p>
      <div className={`${reactsModal} ${closeReactions && hidden}`}>
        <div
          onClick={() => handleAddReaction(1)}
          className={singleReactWrapper}
        >
          <IdeaIcon />
          <p className={`${singleReactInfo} bg-global-secondary`}>
            {t("ideaReaction")}
          </p>
        </div>
        <div
          onClick={() => handleAddReaction(2)}
          className={singleReactWrapper}
        >
          <LikeIcon />
          <p className={`${singleReactInfo} bg-global-secondary`}>
            {t("likeReaction")}
          </p>
        </div>
        <div
          onClick={() => handleAddReaction(3)}
          className={singleReactWrapper}
        >
          <ApprovalIcon />
          <p className={`${singleReactInfo} bg-global-secondary`}>
            {t("approvalReaction")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReactionsModal;
