import React, { useState } from 'react';
import {
  editAvatarWrapper,
  editAvatar,
} from "./edit_avatar.module.scss";
import {
  form,
  inputWrapper,
  input,
  btn,
  deleteAccount,
  favoriteTheme,
  userPictureWrapper,
  userPicture,
} from "components/forms/form.module.scss";

const EditAvatarModal = () => {
  const [file, setFile] = useState([]);

  return (
    <div className={editAvatarWrapper}>
      <div className={`${editAvatar} bg-global-secondary`}>
          <form className={form}>
            <p>Changez votre avatar</p>
            <div className={inputWrapper}>
              <input type="file" onChange={(e) => setFile(e.target.files)}></input>
            </div>
            <input
              type="submit"
              className={`${btn} bg-primary txt-btn`}
              role="button"
              value="Éditer"
              disabled={file?.length < 1}
            />
        </form>
      </div>
    </div>
  );
};

export default EditAvatarModal;