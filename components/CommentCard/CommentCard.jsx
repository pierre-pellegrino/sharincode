import React, { useEffect, useState } from "react";
import {
  commentWrapper,
  commentUser,
  commentHeader,
  commentActionsMenu,
  contentStyle,
} from "./comment_card.module.scss";
import {
  profileIconPicture,
  profileIconPictureComment,
} from "components/ProfileIcon/profile_icon.module.scss";
import { formatDistanceToNow } from "date-fns";
import { en, fr } from "date-fns/locale";
import Image from "next/image";
import CommentActionsModal from "components/CommentActionsModal/CommentActionsModal";
import { ThreeDotsIcon } from "components/icons";
import {
  actionsMenu,
  menuDisabled,
} from "components/PostCard/post_card.module.scss";
import cn from "classnames";
import { useRouter } from "next/router";

const CommentCard = ({ comment, currentUser, postId }) => {
  const { locale } = useRouter();
  const { content, created_at, username, avatar, id } = comment;
  const [displayActionsMenu, setDisplayActionsMenu] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (!displayActionsMenu) return;

    const handleClick = () => setDisplayActionsMenu(false);

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [displayActionsMenu]);

  return (
    <div className={`${commentWrapper} bg-global`}>
      <div className={`${profileIconPicture} ${profileIconPictureComment}`}>
        <Image
          src={avatar ?? "/profile.jpeg"}
          alt="Profile Picture"
          height={48}
          width={48}
        />
      </div>
      <div className={commentUser}>
        <div className={commentHeader}>
          <p>{username || "Pseudonyme"}</p>
          <i>
            {formatDistanceToNow(new Date(created_at), {
              addSuffix: true,
              locale: locale === "fr" ? fr : en,
            })}
          </i>
          {currentUser &&
            username === currentUser.user.username &&
            (buttonDisabled ? (
              <div
                className={`${actionsMenu} ${commentActionsMenu} ${menuDisabled}`}
              >
                <ThreeDotsIcon />
                <CommentActionsModal
                  opened={displayActionsMenu}
                  postId={postId}
                  commentId={id}
                  content={content}
                  setButtonDisabled={setButtonDisabled}
                />
              </div>
            ) : (
              <div
                role="button"
                className={`${actionsMenu} ${commentActionsMenu}`}
                onClick={() => setDisplayActionsMenu(true)}
              >
                <ThreeDotsIcon />
                <CommentActionsModal
                  opened={displayActionsMenu}
                  postId={postId}
                  commentId={id}
                  content={content}
                  setButtonDisabled={setButtonDisabled}
                />
              </div>
            ))}
          <CommentActionsModal />
        </div>
        <p
          className={cn({
            [contentStyle]: username === currentUser?.user.username,
          })}
          style={{
            overflowWrap: "break-word",
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
