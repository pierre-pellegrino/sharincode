import cn from "classnames";
import {
  modal,
  offscreen,
  navItems,
  navItem
} from "./post_actions_modal.module.scss";

const PostActionsModal = ({ opened }) => {
  return (
    <div className={cn(modal, {
      [offscreen]: !opened,
    })}>
      <ul className={navItems}>
        <li className={navItem}>
          Editer
        </li>
        <li className={navItem}>
          Supprimer
        </li>
      </ul>
    </div>
  );
};

export default PostActionsModal;
