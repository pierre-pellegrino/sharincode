import React from "react";
import CommentCard from "../CommentCard/CommentCard";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import {
  commentsSectionWrapper,
  visitorMessage,
} from "./comments_section.module.scss";
import { useAtom } from "jotai";
import { userAtom } from "store";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const CommentsSection = ({ comments, id, commentRef }) => {
  const [currentUser] = useAtom(userAtom);
  const { t } = useTranslation("comments");

  return (
    <div className={commentsSectionWrapper}>
      {currentUser && <NewCommentForm currentUser={currentUser} id={id} commentRef={commentRef} />}
      {!currentUser && (
        <p className={visitorMessage}>
          <Link href="/register">
            <a className="txt-primary">{t("message.createAccount")}</a>
          </Link>
          {` ${t("message.or")} `}
          <Link href="/login">
            <a className="txt-primary">{t("message.login")}</a>
          </Link>
          &nbsp;{t("message.toCreateComment")}
        </p>
      )}

      {comments &&
        comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment.id}
              comment={comment.comment}
              currentUser={currentUser}
              postId={id}
            />
          );
        })}
    </div>
  );
};

export default CommentsSection;
