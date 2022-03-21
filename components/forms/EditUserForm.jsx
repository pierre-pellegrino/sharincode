import { useRef, useEffect, useState } from "react";
import {
  form,
  inputWrapper,
  input,
  btn,
  deleteAccount,
} from "./form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "store";

const EditUserForm = ({user}) => {
  const [_, setUser] = useAtom(userAtom);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState(user?.description ?? "");
  const [github, setGithub] = useState(user?.github_url ?? "");
  const [personal, setPersonal] = useState(user?.personal_url ?? "");

  const handleDeleteAccount = () => {
    if (confirm("Êtes-vous sûr ?\nCette action est irréversible.")) {
      APIManager.deleteUser(user.id);
      setUser(null);

      router.push('/');
    }
  }

  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        username: user?.username,
        description: description,
        github_url: github,
        personal_url: personal,
        favorite_theme: ""
      },
    };

    try {
      const response = await APIManager.updateProfile(user.id, data);
      console.log(response.data);
      setSuccess(true);
      router.push(`/profile/${user.id}`);
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setErrMsg("Oups ! Pas de réponse du serveur...");
      } else {
        setErrMsg(err.response.data.message);
      }
    }
  };

  return (
    <>
      <form className={form} onSubmit={handleUpdate}>

        {success && (
          <p>
            Modifications enregistrées !
          </p>
        )}

        <p
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <div className={inputWrapper}>
          <input
            type="text"
            id="description-input"
            className={`${input}`}
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="description-input">Description</label>
        </div>

        <div className={inputWrapper}>
          <input
            type="text"
            id="github-input"
            className={`${input}`}
            placeholder=" "
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <label htmlFor="github-input">Lien Github</label>
        </div>

        <div className={inputWrapper}>
          <input
            type="text"
            id="personal-input"
            className={`${input}`}
            placeholder=" "
            value={personal}
            onChange={(e) => setPersonal(e.target.value)}
          />
          <label htmlFor="personal-input">Autre lien</label>
        </div>

        <p> Thème favori à venir </p>

        <input
          className={btn}
          type="submit"
          role="button"
          value="éditer"
        />
      </form>

      <p className={deleteAccount} onClick={() => handleDeleteAccount()}>Supprimer mon compte</p>
    </>
  );
};

export default EditUserForm;