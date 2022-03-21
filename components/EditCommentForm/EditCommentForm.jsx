import React, { useEffect, useState } from "react";
import {
  newCommentWrapper,
  form,
} from "components/NewCommentForm/new_comment_form.module.scss";
import {
  inputWrapper
} from "components/NewPostModal/new_post_modal.module.scss";
import { btn } from "components/forms/form.module.scss";
import { WarningIcon } from "components/icons";
import APIManager from "pages/api/axios";
import { editComment, editCommentBlocker } from "./edit_comment.module.scss";
import { useSWRConfig } from "swr";

const EditCommentForm = ({ commentId, postId, content, closeModal, setButtonDisabled }) => {
  const [description, setDescription] = useState(content);

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (setButtonDisabled) setButtonDisabled(true);
    document.body.style.overflow = "hidden";
  }, [setButtonDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      content: description,
    };

    const response = await APIManager.editComment(postId, commentId, data);
    console.log(response.data);

    await mutate(`/posts/${postId}/comments`);
    closeModal();
    setButtonDisabled(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className={editCommentBlocker} onClick={closeModal} />
      <div className={`${editComment} bg-global-secondary`}>
        <div className={`${newCommentWrapper}`}>
          <form className={form} onSubmit={handleSubmit}>
            <div className={inputWrapper}>
              <p className="txt-primary">
                {description.length} / 300
                {description.length >= 290 && <WarningIcon />}
              </p>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="300"
                required
              />
            </div>
            <input
              type="submit"
              className={`${btn} bg-primary`}
              role="button"
              value="Éditer"
              disabled={description.length < 1}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCommentForm;
