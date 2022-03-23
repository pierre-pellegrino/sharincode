import React from 'react';
import {
  btn,
  openReacts,
  reactsModal,
  singleReactWrapper,
  singleReactInfo
} from "components/PostCard/post_card.module.scss";
import { ApprovalIcon, LikeIcon, IdeaIcon } from "components/icons";
import APIManager from "pages/api/axios";
import {useSWRConfig} from "swr";
import {useAtom} from "jotai";
import {userAtom} from "store";

const ReactionsModal = ({postId, reactions}) => {
  const [currentUser] = useAtom(userAtom);
  const currentUserId = currentUser?.user.id ?? null;
  const currentUserReact = reactions.filter(react => react.user_id === currentUserId);
  const {mutate} = useSWRConfig();

  const reacts = [
    "",
    "Light",
    "Love",
    "Check"
  ];

  const handleAddReaction = async (reactIndex) => {

    if (currentUserReact && currentUserReact.length > 0) {
      const deleteReactResponse = await APIManager.deleteReaction(postId);
      console.log(deleteReactResponse);
    }

    const data = {
      name: reacts[reactIndex]
    };

    if (!currentUserReact || currentUserReact[0]?.reaction_id !== reactIndex) {
      const response = await APIManager.addReaction(postId, data);
      console.log(response.data);
    }

    mutate("/posts?page=1");
  }

  return (
    <div className={`${btn} ${openReacts}`}>
      <p>Réagir</p>
      <div className={reactsModal}>
        <div onClick={() => handleAddReaction(1)} className={singleReactWrapper}>
          <IdeaIcon />
          <p className={`${singleReactInfo} bg-global-secondary`}>
            Bonne idée !
          </p>
        </div>
        <div onClick={() => handleAddReaction(2)} className={singleReactWrapper}>
          <LikeIcon />
          <p className={`${singleReactInfo} bg-global-secondary`}>
            J'aime !
          </p>
        </div>
        <div onClick={() => handleAddReaction(3)} className={singleReactWrapper}>
          <ApprovalIcon />
          <p className={`${singleReactInfo} bg-global-secondary`}>
            Je valide !
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReactionsModal;