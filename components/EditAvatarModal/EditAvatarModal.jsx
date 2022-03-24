import React, { useRef, useState } from "react";
import { editAvatarWrapper, editAvatar } from "./edit_avatar.module.scss";
import { form, inputWrapper, btn } from "components/forms/form.module.scss";
import APIManager from "pages/api/axios";
import { useSWRConfig } from "swr";

const EditAvatarModal = ({ closeModal }) => {
  const [file, setFile] = useState([]);
  const avatar = useRef();
  const { mutate } = useSWRConfig();
  const [loadingText, setLoadingText] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formObj = {
      avatar: avatar.current.files[0],
    };

    const data = new FormData();

    Object.keys(formObj).forEach((key) => {
      data.append(key, formObj[key]);
    });

    try {
      setLoadingText(true);
      const response = await APIManager.updateProfile(data);

      mutate(`profiles/${id}`);
    } catch (error) {
      console.error(error);
    }

    closeModal();
    setLoadingText(false);
  };

  return (
    <>
      <div className={editAvatarWrapper} onClick={closeModal} />
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
            value={loadingText ? "Chargement..." : "Valider"}
            disabled={file?.length < 1}
          />
        </form>
      </div>
    </>
  );
};

export default EditAvatarModal;
