import { ApprovalIcon, LikeIcon, IdeaIcon } from "components/icons";
import React, { useEffect, useState } from "react";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import SnippetHighlighter from "../SnippetHighlighter/SnippetHighlighter";
import Link from "next/link";
import {
  postCardWrapper,
  top,
  description as descriptionStyle,
  snippet as snippetStyle,
  bottom,
  btnsWrapper,
  btn,
  reactsWrapper,
  reacts,
  reactItem,
  comments,
  openReacts,
  reactsModal,
  postCardDetailPage,
  comment,
  actionsMenu,
  topRight,
  language as languageStyle,
  menuDisabled,
} from "./post_card.module.scss";
import { formatDistanceToNow } from "date-fns";
import { en, fr } from "date-fns/locale";
import { ThreeDotsIcon } from "components/icons";
import PostActionsModal from "components/PostActionsModal";
import { userAtom } from "store";
import { useAtom } from "jotai";

const PostCard = ({ post, detail, theme }) => {
  const [user] = useAtom(userAtom);

  const language = post.snippets[0]?.language.replace(/^(\[")(.+)("])$/, "$2");
  const description = post.description;
  const snippet = post.snippets[0]?.content || "There is no code yet.";
  const date = post.created_at;
  const author = post.user;
  const id = post.id;
  const commentNb = post.comments;

  const [displayActionsMenu, setDisplayActionsMenu] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const nbOfComments = commentNb.reduce((acc, i) => (acc += 1), 0);

  useEffect(() => {
    if (!displayActionsMenu) return;

    const handleClick = () => setDisplayActionsMenu(false);

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [displayActionsMenu]);

  return (
    <div
      className={`${postCardWrapper} ${
        detail && postCardDetailPage
      } bg-global-secondary`}
    >
      <div className={top}>
        <ProfileIcon user={author} />
        <div className={topRight}>
          <i>
            {formatDistanceToNow(new Date(date), {
              addSuffix: true,
              locale: fr,
            })}
          </i>
          {user &&
            user.user.id === post.user.user_id &&
            (buttonDisabled ? (
              <div className={`${actionsMenu} ${menuDisabled}`}>
                <ThreeDotsIcon />
                <PostActionsModal
                  opened={displayActionsMenu}
                  postId={id}
                  description={description}
                  language={language}
                  snippet={snippet}
                  post={post}
                  setButtonDisabled={setButtonDisabled}
                />
              </div>
            ) : (
              <div
                role="button"
                className={actionsMenu}
                onClick={() => setDisplayActionsMenu(true)}
              >
                <ThreeDotsIcon />
                <PostActionsModal
                  opened={displayActionsMenu}
                  postId={id}
                  description={description}
                  language={language}
                  snippet={snippet}
                  post={post}
                  setButtonDisabled={setButtonDisabled}
                />
              </div>
            ))}
        </div>
      </div>
      <Link href={`/posts/${id}`} passHref>
        <div className={descriptionStyle}>
          <a>{description}</a>
        </div>
      </Link>
      <div className={snippetStyle}>
        <p className={languageStyle}>{language}</p>
        <SnippetHighlighter
          snippet={snippet}
          language={language}
          theme={theme}
        />
      </div>
      <div className={bottom}>
        <div className={reactsWrapper}>
          <div className={reacts}>
            <div className={reactItem}>
              <p>5 {/* A modifier par le nombre en back */}</p>
              <IdeaIcon />
            </div>
            <div className={reactItem}>
              <p>3 {/* A modifier par le nombre en back */}</p>
              <LikeIcon />
            </div>
            <div className={reactItem}>
              <p>12 {/* A modifier par le nombre en back */}</p>
              <ApprovalIcon />
            </div>
          </div>
          <Link href={`/posts/${id}`}>
            <a className={comments}>
              {nbOfComments} commentaire{nbOfComments > 1 && "s"}
            </a>
          </Link>
        </div>
        <div className={btnsWrapper}>
          <div className={`${btn} ${openReacts}`}>
            <p>Réagir</p>
            <div className={reactsModal}>
              <IdeaIcon />
              <LikeIcon />
              <ApprovalIcon />
            </div>
          </div>
          <Link href={`/posts/${id}`}>
            <a className={btn}>
              <p className={{ comment }}>Commenter</p>
            </a>
          </Link>
          <p className={btn}>Partager</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
