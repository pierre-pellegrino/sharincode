import cn from "classnames";
import APIManager from "pages/api/axios";
import { useSWRConfig } from "swr";
import {
  modal,
  offscreen,
  navItems,
  navItem
} from "./post_actions_modal.module.scss";

const PostActionsModal = ({ opened, postId }) => {
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await APIManager.deletePost(postId);
      await mutate("/posts");
    } catch (e) {
      console.error(e.response);
    }
  }

  return (
    <div className={cn(modal, {
      [offscreen]: !opened,
    })}>
      <ul className={navItems}>
        <li className={navItem}>
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
