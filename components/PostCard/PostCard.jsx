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
import { userAtom, isConnectedAtom } from "store";
import { useAtom } from "jotai";
import ReactionsModal from "components/ReactionsModal/ReactionsModal";
import ShareModal from "components/ShareModal/ShareModal";
import FormattedDescription from "./FormattedDescription";

const PostCard = ({ post, detail, theme, page }) => {
  const [user] = useAtom(userAtom);
  const [isConnected] = useAtom(isConnectedAtom);

  const language = post.snippets[0]?.language.replace(/^(\[")(.+)("])$/, "$2");
  const description = post.description;
  const snippet = post.snippets[0]?.content || "There is no code yet.";
  const date = post.created_at;
  const author = post.user;
  const id = post.id;
  const commentNb = post.comments;
  const reactions = post.reactions;
  const lightReacts = reactions.filter(react => react.reaction_id === 1);
  const loveReacts = reactions.filter(react => react.reaction_id === 2);
  const checkReacts = reactions.filter(react => react.reaction_id === 3);
  const snippet_list = post.snippets
  const currentUserReact = reactions.filter(react => react.user_id === user?.user.id)[0]?.reaction_id || 0;

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
      <FormattedDescription description={description} />
      <div className={snippetStyle}>
        {
          snippet_list.map((snippet) => (
            <div key={snippet.id} className={snippetStyle}>
              <p className={languageStyle}>{snippet.language}</p>
              <SnippetHighlighter
                snippet={snippet.content}
                language={snippet.language}
                theme={theme}
              />
            </div>
          ))
        }
      </div>
      <div className={bottom}>
        <div className={reactsWrapper}>
          <div className={reacts}>
            <div className={reactItem}>
              <p className={currentUserReact === 1 ? "txt-primary" : ""}>{lightReacts.length}</p>
              <IdeaIcon />
            </div>
            <div className={reactItem}>
              <p className={currentUserReact === 2 ? "txt-primary" : ""}>{loveReacts.length}</p>
              <LikeIcon />
            </div>
            <div className={reactItem}>
              <p className={currentUserReact === 3 ? "txt-primary" : ""}>{checkReacts.length}</p>
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
          {isConnected && <ReactionsModal postId={id} reactions={reactions} page={page} userId={author.user_id}/>}
          <Link href={`/posts/${id}`}>
            <a className={btn}>
              <p className={{ comment }}>Commenter</p>
            </a>
          </Link>
          <ShareModal language={language} author={author} id={id}/>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
