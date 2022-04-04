import { useEffect, useState } from "react";
import {
  form,
  inputWrapper,
  input,
  btn,
  deleteAccount,
  favoriteTheme,
  userPictureWrapper,
  userPicture,
  instructions,
  offscreen,
} from "./form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "store";
import ThemeSelect from "components/ThemeSelect";
import { preferedThemeAtom } from "store";
import Image from "next/image";
import EditAvatarModal from "../EditAvatarModal/EditAvatarModal";
import ValidationIcon from "components/ValidationIcon";
import { InfoIcon } from "components/icons";
import { USERNAME_REGEX, GITHUB_REGEX, URL_REGEX } from "lib/constants/validations";
import cn from "classnames";
import { useTranslation } from "next-i18next";

const EditUserForm = ({ user, mutate, userAvatar, userId }) => {
  const router = useRouter();
  const [_, setUser] = useAtom(userAtom);
  const { t } = useTranslation(["edit-profile", "forms"]);

  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  const [username, setUsername] = useState(user?.username ?? "");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [description, setDescription] = useState(user?.description ?? "");

  const [github, setGithub] = useState(user?.github_url || "https://github.com/");
  const [validGithub, setValidGithub] = useState(false);
  const [githubFocus, setGithubFocus] = useState(false);

  const [personal, setPersonal] = useState(user?.personal_url ?? "");
  const [validPersonal, setValidPersonal] = useState(false);
  const [personalFocus, setPersonalFocus] = useState(false);

  const [btnValue, setBtnValue] = useState(t("edit"));
  const [preferedTheme] = useAtom(preferedThemeAtom);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    if (confirm(t("deleteConfirm"))) {
      APIManager.deleteUser();
      router.push("/");
      setUser(null);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = GITHUB_REGEX.test(github);
    setValidGithub(result);
  }, [github]);

  useEffect(() => {
    const result = URL_REGEX.test(personal);
    setValidPersonal(result);
  }, [personal]);

  useEffect(() => {
    if (user && user.favorite_theme !== preferedTheme) {
      try {
        APIManager.updateProfile({
          ...user,
          favorite_theme: preferedTheme,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [preferedTheme, user]);

  const canSave = [
    validUsername,
    validGithub || github === "" || github === "https://github.com/",
    validPersonal || personal === ""
  ].every(Boolean);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    setBtnValue(t("savingBtn"));

    const data = {
      username: username.trim(),
      description: description,
      github_url: github === "https://github.com/" ? "" : github,
      personal_url: personal,
      favorite_theme: preferedTheme,
    };

    try {
      await APIManager.updateProfile(data);
      await mutate();
      setSuccess(true);
      setErrMsg(false);
      setBtnValue(t("edit"));

      await setUser((prev) => {
        const {
          username,
          description,
          github_url,
          personal_url,
          favorite_theme,
        } = data;

        return {
          ...prev,
          user: {
            ...user,
            username,
            description,
            github_url,
            personal_url,
            favorite_theme,
          },
        };
      });
    } catch (err) {
      setBtnValue(t("edit"));
      setErrMsg(true);
      setSuccess(false);
    }
  };

  return (
    <>
      <div className={userPictureWrapper} onClick={() => setModalOpen(true)}>
        <Image
          className={userPicture}
          src={userAvatar || "/profile.jpeg"}
          alt="Profile Picture"
          height={128}
          width={128}
        />
        <p>{t("avatar")}</p>
      </div>
      {modalOpen && (
        <EditAvatarModal closeModal={handleCloseModal} userId={userId} />
      )}
      <form className={`${form} links-form`} onSubmit={handleUpdate}>
        {success && <p>{t("success")}</p>}
        {errMsg && <p>{t("usernameAlreadyTaken")}</p>}

        <p aria-live="assertive">{errMsg}</p>

        <div className={inputWrapper}>
          <input
            type="text"
            id="username-input"
            className={`${input}`}
            autoComplete="off"
            placeholder=" "
            value={username}
            aria-invalid={validUsername ? "false" : "true"}
            aria-describedby="uidnote"
            required
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
          <label htmlFor="username-input">{t("forms:username.value")}</label>
          <ValidationIcon isValid={validUsername} />
          <p
            id="uidnote"
            className={cn(instructions, {
              [offscreen]: !(usernameFocus && username && !validUsername),
            })}
          >
            <InfoIcon />
            {t("forms:username.instructions")}
          </p>
        </div>

        <div className={inputWrapper}>
          <input
            type="text"
            id="description-input"
            autoComplete="off"
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
            autoComplete="off"
            className={`${input}`}
            placeholder=" "
            value={github}
            aria-invalid={validGithub ? "false" : "true"}
            aria-describedby="githubnote"
            onChange={(e) => setGithub(e.target.value)}
            onFocus={() => setGithubFocus(true)}
            onBlur={() => setGithubFocus(false)}
          />
          <label htmlFor="github-input">{t("forms:githubLink.value")}</label>
          <ValidationIcon isValid={validGithub} />
          <p
            id="uidnote"
            className={cn(instructions, {
              [offscreen]: !(githubFocus && github && !validGithub),
            })}
          >
            <InfoIcon />
            {t("forms:githubLink.instructions")}
          </p>
        </div>

        <div className={inputWrapper}>
          <input
            type="text"
            id="personal-input"
            autoComplete="off"
            className={`${input}`}
            placeholder=" "
            value={personal}
            aria-invalid={validPersonal ? "false" : "true"}
            aria-describedby="personalnote"
            onChange={(e) => setPersonal(e.target.value)}
            onFocus={() => setPersonalFocus(true)}
            onBlur={() => setPersonalFocus(false)}
          />
          <label htmlFor="personal-input">{t("forms:otherLink.value")}</label>
          <ValidationIcon isValid={validPersonal} />
          <p
            id="personalnote"
            className={cn(instructions, {
              [offscreen]: !(personalFocus && personal && !validPersonal),
            })}
          >
            <InfoIcon />
            {t("forms:otherLink.instructions")}
          </p>
        </div>

        <input
          className={`${btn} bg-primary txt-btn`}
          type="submit"
          role="button"
          disabled={!canSave}
          value={btnValue}
        />

        <p className={favoriteTheme}>{t("favoriteTheme")}</p>
        <ThemeSelect />
      </form>

      <p className={deleteAccount} onClick={() => handleDeleteAccount()}>
        {t("deleteAccount")}
      </p>
    </>
  );
};

export default EditUserForm;
