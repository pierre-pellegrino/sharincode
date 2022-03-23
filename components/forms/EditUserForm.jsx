import { useEffect, useState } from "react";
import {
  form,
  inputWrapper,
  input,
  btn,
  deleteAccount,
  favoriteTheme,
} from "./form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "store";
import ThemeSelect from "components/ThemeSelect";
import { preferedThemeAtom } from "store";

const EditUserForm = ({ user, mutate }) => {
  const [_, setUser] = useAtom(userAtom);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState(user?.description ?? "");
  const [github, setGithub] = useState(user?.github_url ?? "");
  const [personal, setPersonal] = useState(user?.personal_url ?? "");

  const [btnValue, setBtnValue] = useState("Editer");
  const [preferedTheme] = useAtom(preferedThemeAtom);

  const handleDeleteAccount = () => {
    if (confirm("Êtes-vous sûr ?\nCette action est irréversible.")) {
      APIManager.deleteUser();
      setUser(null);
      router.push("/");
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (user && user.favorite_theme !== preferedTheme) {
      try {
        APIManager.updateProfile({
          user: {
            favorite_theme: preferedTheme,
          }
        });
      } catch (err) {
        console.error(err.response);
      }
    }
  })

  const handleUpdate = async (e) => {
    e.preventDefault();

    setBtnValue("Edition en cours...");

    const data = {
      user: {
        username: user?.username,
        description: description,
        github_url: github,
        personal_url: personal
      },
    };

    try {
      const response = await APIManager.updateProfile(data);
      await mutate();
      setSuccess(true);
      setBtnValue("Editer");
    } catch (err) {
      setBtnValue("Editer");
      
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
        {success && <p>Modifications enregistrées !</p>}

        <p aria-live="assertive">{errMsg}</p>

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

        <input
          className={`${btn} bg-primary txt-btn`}
          type="submit"
          role="button"
          value={btnValue}
        />

        <p className={favoriteTheme}>Thème favori</p>
        <ThemeSelect />
      </form>

      <p className={deleteAccount} onClick={() => handleDeleteAccount()}>
        Supprimer mon compte
      </p>
    </>
  );
};

export default EditUserForm;
