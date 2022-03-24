import cn from "classnames";
import NewPostModal from "components/NewPostModal";
import Link from "next/link";
import { useRouter } from "next/router";
import APIManager from "pages/api/axios";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
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
    snippetList,
    post,
    setButtonDisabled,
  } = props;

  const { mutate } = useSWRConfig();
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const middleBreakpoint = useMediaQuery({ query: "(max-width: 1000px)" });
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await APIManager.deletePost(postId);
      await mutate("/posts");
      router.replace("/");
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
          snippetList={snippetList}
          post={post}
          setButtonDisabled={setButtonDisabled}
        />
      )}
      <ul className={navItems}>
        {middleBreakpoint ? (
          <li className={navItem}>
            <Link href={`/posts/${postId}/edit`}>
              <a>Editer</a>
            </Link>
          </li>
        ) : (
          <li className={navItem} onClick={() => setDisplayEditModal(true)}>
            Editer
          </li>
        )}
        <li className={navItem} onClick={handleDelete}>
          Supprimer
        </li>
      </ul>
    </div>
  );
};

export default PostActionsModal;
