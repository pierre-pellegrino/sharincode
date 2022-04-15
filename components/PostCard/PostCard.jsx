import {
  ApprovalIcon,
  LikeIcon,
  IdeaIcon,
  StarIconOutlined,
  StarIcon,
} from "components/icons";
import React, { useEffect, useState } from "react";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import SnippetHighlighter from "../SnippetHighlighter/SnippetHighlighter";
import Link from "next/link";
import {
  postCardWrapper,
  top,
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
  favorite,
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
import APIManager from "pages/api/axios";
import { useSWRConfig } from "swr";
import { useTranslation } from "next-i18next";

const PostCard = ({
  post,
  detail,
  theme,
  page,
  mutate: mutateProfile,
  commentRef,
  locale,
}) => {
  const [user, setUser] = useAtom(userAtom);
  const [isConnected] = useAtom(isConnectedAtom);
  const { t } = useTranslation();

  const description = post.description;
  const date = post.created_at;
  const author = post.user;
  const id = post.id;
  const commentNb = post.comments;
  const reactions = post.reactions;

  const lightReacts = reactions.filter((react) => react.reaction_id === 1);
  const loveReacts = reactions.filter((react) => react.reaction_id === 2);
  const checkReacts = reactions.filter((react) => react.reaction_id === 3);
  const snippetList = post.snippets;
  const currentUserReact =
    reactions.filter((react) => react.user_id === user?.user.id)[0]
      ?.reaction_id || 0;

  const [displayActionsMenu, setDisplayActionsMenu] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const nbOfComments = commentNb.reduce((acc, i) => (acc += 1), 0);

  const [isFavorite, setIsFavorite] = useState(false);

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!displayActionsMenu) return;

    const handleClick = () => setDisplayActionsMenu(false);

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [displayActionsMenu]);

  useEffect(() => {
    if (!user) return;
    if (user?.user?.id === post?.user?.user_id) return;

    setIsFavorite(
      user.favorite_posts.find((fav) => fav.post.id === id) !== undefined
    );
  }, [id, post?.user?.user_id, user]);

  const handleAddFavorite = async () => {
    try {
      setIsFavorite(true);
      await APIManager.addFavorite(id);

      const updatedUser = await APIManager.getMyProfile();

      await mutate("/posts");
      await mutate(`/posts/${id}`);
      if (mutateProfile) mutateProfile();
      await setUser(updatedUser.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      setIsFavorite(false);
      const favoriteId = user.favorite_posts.find(
        (fav) => fav.post.id === id
      ).favorite_id;

      await APIManager.removeFavorite(favoriteId);

      const updatedUser = await APIManager.getMyProfile();

      await mutate("/posts");
      await mutate(`/posts/${id}`);
      if (mutateProfile) mutateProfile();
      await setUser(updatedUser.data);
    } catch (err) {
      console.error(err);
    }
  };

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
              locale: locale === "fr" ? fr : en,
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
                  snippetList={snippetList}
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
                  snippetList={snippetList}
                  post={post}
                  setButtonDisabled={setButtonDisabled}
                />
              </div>
            ))}
          {user &&
            user.user.id !== post.user.user_id &&
            (isFavorite ? (
              <button className={favorite} onClick={handleRemoveFavorite}>
                <StarIcon />
              </button>
            ) : (
              <button className={favorite} onClick={handleAddFavorite}>
                <StarIconOutlined />
              </button>
            ))}
        </div>
      </div>
      <FormattedDescription description={description} />
      <div className={snippetStyle}>
        {snippetList.map((snippet) => (
          <div key={snippet.id} className={snippetStyle}>
            <p className={languageStyle}>{snippet.language}</p>
            <SnippetHighlighter
              snippet={snippet.content}
              language={snippet.language}
              theme={theme}
            />
          </div>
        ))}
      </div>
      <div className={bottom}>
        <div className={reactsWrapper}>
          <div className={reacts}>
            <div className={reactItem}>
              <p className={currentUserReact === 1 ? "txt-primary" : ""}>
                {lightReacts.length}
              </p>
              <IdeaIcon />
            </div>
            <div className={reactItem}>
              <p className={currentUserReact === 2 ? "txt-primary" : ""}>
                {loveReacts.length}
              </p>
              <LikeIcon />
            </div>
            <div className={reactItem}>
              <p className={currentUserReact === 3 ? "txt-primary" : ""}>
                {checkReacts.length}
              </p>
              <ApprovalIcon />
            </div>
          </div>
          <Link href={`/posts/${id}`}>
            <a className={comments}>
              {`${nbOfComments} ${t("comments")}${nbOfComments > 1 ? "s" : ""}`}
            </a>
          </Link>
        </div>
        <div className={btnsWrapper}>
          {isConnected && (
            <ReactionsModal
              postId={id}
              reactions={reactions}
              page={page}
              userId={author.user_id}
              mutate={mutateProfile}
            />
          )}
          <Link href={{ pathname: `/posts/${id}`, query: { comment: true } }}>
            <a
              className={btn}
              onClick={() => {
                if (commentRef?.current) commentRef.current.focus();
              }}
            >
              <p className={{ comment }}>{t("commentBtn")}</p>
            </a>
          </Link>
          <ShareModal
            language={snippetList[0].language}
            author={author}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
