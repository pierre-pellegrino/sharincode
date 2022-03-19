import cn from "classnames";
import APIManager from "pages/api/axios";
import { useState } from "react";
import { useSWRConfig } from "swr";
import {
  modal,
  offscreen,
  navItems,
  navItem,
} from "components/PostActionsModal/post_actions_modal.module.scss";
import EditCommentForm from "../EditCommentForm/EditCommentForm";

const PostActionsModal = (props) => {
  const { opened, postId, commentId, content, setButtonDisabled } = props;

  const { mutate } = useSWRConfig();
  const [displayEditModal, setDisplayEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await APIManager.deleteComment(postId, commentId);
      await mutate(`/posts/${postId}/comments`);
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
        <EditCommentForm
          postId={postId}
          commentId={commentId}
          content={content}
          closeModal={() => setDisplayEditModal(false)}
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
