import cn from "classnames";
import NewPostModal from "components/NewPostModal";
import APIManager from "pages/api/axios";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import {
  modal,
  offscreen,
  navItems,
  navItem,
} from "./post_actions_modal.module.scss";

const PostActionsModal = (props) => {
  const {
    opened,
    postId,
    description,
    language,
    snippet,
    post,
    setButtonDisabled,
  } = props;

  const { mutate } = useSWRConfig();
  const [displayEditModal, setDisplayEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await APIManager.deletePost(postId);
      await mutate("/posts");
    } catch (e) {
      console.error(e.response);
    }
  };

  return (
    <div
      className={cn(modal, {
        [offscreen]: !opened,
      })}
    >
      {displayEditModal && (
        <NewPostModal
          closeModal={() => setDisplayEditModal(false)}
          description={description}
          language={language}
          snippet={snippet}
          post={post}
          setButtonDisabled={setButtonDisabled}
        />
      )}
      <ul className={navItems}>
        <li className={navItem} onClick={() => setDisplayEditModal(true)}>
          Editer
        </li>
        <li className={navItem} onClick={handleDelete}>
          Supprimer
        </li>
      </ul>
    </div>
  );
};

export default PostActionsModal;
