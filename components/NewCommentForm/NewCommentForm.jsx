import React, { useState } from 'react';
import ProfileIcon from "components/ProfileIcon/ProfileIcon";
import {
  newCommentWrapper,
  form
} from "./new_comment_form.module.scss";
import { btn } from "components/forms/form.module.scss";
import {WarningIcon} from "components/icons";
import APIManager from "pages/api/axios";

const NewCommentForm = ({currentUser, id}) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const data = {
      content: description
    }

    const response = await APIManager.createComment(id, data);
    console.log(response.data);
  }

  return (
    <div className={newCommentWrapper}>
      <ProfileIcon user={currentUser}/>
      
      <form className={form} onSubmit={handleSubmit}>
        <p> 
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
        <input
          type="submit"
          className={btn}
          role="button"
          value="Commenter"
          disabled={description.length<1}
        />
      </form>
    </div>
  );
};

export default NewCommentForm;