import React, { useState } from "react";
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import { newCommentWrapper, form } from "./new_comment_form.module.scss";
import { btn } from "components/forms/form.module.scss";
import { WarningIcon } from "components/icons";
import APIManager from "pages/api/axios";
import { useSWRConfig } from "swr";
import { useTranslation } from "next-i18next";

const NewCommentForm = ({ currentUser, id, commentRef }) => {
  const [description, setDescription] = useState("");
  const { mutate } = useSWRConfig();
  const { t } = useTranslation("comments");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      content: description,
    };

    await APIManager.createComment(id, data);
    setDescription("");
    await mutate(`/posts/${id}/comments`);
  };

  return (
    <div className={newCommentWrapper}>
      <ProfileIcon user={currentUser} />

      <form className={form} onSubmit={handleSubmit}>
        <p>
          {description.length} / 300
          {description.length >= 290 && <WarningIcon />}
        </p>
        <textarea
          name="description"
          id="description"
          value={description}
          className="bg-global-secondary"
          onChange={(e) => setDescription(e.target.value)}
          maxLength="300"
          ref={commentRef}
          required
        />
        <input
          type="submit"
          className={`${btn} bg-primary txt-btn`}
          role="button"
          value={t("commentBtn")}
          disabled={description.length < 1}
        />
      </form>
    </div>
  );
};

export default NewCommentForm;
