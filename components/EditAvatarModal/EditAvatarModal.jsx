import React, { useRef, useState } from 'react';
import {
  editAvatarWrapper,
  editAvatar,
} from "./edit_avatar.module.scss";
import {
  form,
  inputWrapper,
  btn,
} from "components/forms/form.module.scss";
import APIManager from "pages/api/axios";

const EditAvatarModal = () => {
  const [file, setFile] = useState([]);
  const avatar = useRef();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formObj = {
      avatar: avatar.current.files[0],
    }
  
    const data = new FormData();
  
    Object.keys(formObj).forEach((key) => {
      data.append(key, formObj[key])
    });

    try {
      const response = await APIManager.updateProfile(data);
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={editAvatarWrapper}>
      <div className={`${editAvatar} bg-global-secondary`}>
          <form className={form} onSubmit={handleUpdate}>
            <p>Changez votre avatar</p>
            <div className={inputWrapper}>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files)}
                accept="image/png, image/jpeg"
                ref={avatar}
            />
            </div>
            <input
              type="submit"
              className={`${btn} bg-primary txt-btn`}
              role="button"
              value="Valider"
              disabled={file?.length < 1}
            />
        </form>
      </div>
    </div>
  );
};

export default EditAvatarModal;