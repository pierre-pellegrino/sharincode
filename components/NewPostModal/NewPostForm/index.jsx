import EditorContainer from "components/EditorContainer";
import { LANGUAGES } from "lib/constants/languages";
import { useRef, useState } from "react";
import {
  form,
  inputWrapper,
  descriptionEditor,
} from "../new_post_modal.module.scss";
import { btn } from "components/forms/form.module.scss";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { showNewPostModalAtom } from "store";
import { useSWRConfig } from "swr";
import DescriptionEditor, {
  createEditorStateWithText,
} from "@draft-js-plugins/editor";
import createHashtagPlugin, {
  extractHashtagsWithIndices,
} from "@draft-js-plugins/hashtag";
import HashtagLink from "components/Hashtag";
import { useEffect } from "react";

const NewPostForm = ({
  editDescription,
  editLanguage,
  editSnippet,
  post,
  closeModal,
  setButtonDisabled,
}) => {
  const descriptionRef = useRef();
  const router = useRouter();
  const [_, setShowNewPostModalAtom] = useAtom(showNewPostModalAtom);

  const [description, setDescription] = useState(
    createEditorStateWithText(editDescription ?? "")
  );
  const [snippet, setSnippet] = useState(editSnippet ?? "");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (!editLanguage) return `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`;

    const languageObj = LANGUAGES.filter(
      (lang) => lang.name === editLanguage
    )[0];

    return `${languageObj.name} ${languageObj.mode}`;
  });
  const [btnValue, setBtnValue] = useState(
    editSnippet ? "Editer mon snippet" : "Partager mon code au monde ! 🚀"
  );

  const hashtagPlugin = createHashtagPlugin({ hashtagComponent: HashtagLink });

  const { mutate } = useSWRConfig();

  const canSave = [
    snippet,
    description,
    selectedLanguage.split(" ").slice(0, -1).join(" "),
  ].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!canSave) throw new Error("Oups, quelque chose s'est mal passé !");

      setBtnValue(editSnippet ? "Edition en cours..." : "Création en cours...");

      const tags = extractHashtagsWithIndices(
        description.getCurrentContent().getPlainText()
      ).map((tag) => tag.hashtag);

      if (!editSnippet) {
        const data = {
          description: description.getCurrentContent().getPlainText(),
          snippets: [
            {
              content: snippet,
              language: selectedLanguage.split(" ").slice(0, -1).join(" "),
            },
          ],
          tags,
        };

        const response = await APIManager.createPost(data);
        setShowNewPostModalAtom(false);

        await mutate("/posts");

        router.push(`/posts/${response.data.post.id}`);

        return;
      }

      const data = {
        ...post,
        description: description.getCurrentContent().getPlainText(),
        snippets: [
          {
            ...post.snippets[0],
            content: snippet,
            language: selectedLanguage.split(" ").slice(0, -1).join(" "),
          },
        ],
        tags,
      };

      const response = await APIManager.editPost(post.id, data);

      await mutate("/posts");

      closeModal();
      setButtonDisabled(false);

      router.push(`/posts/${response.data.post.id}`);
    } catch (e) {
      setBtnValue(
        editSnippet ? "Editer mon snippet" : "Partager mon code au monde ! 🚀"
      );
      console.error(e.response);
    }
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <div className={inputWrapper}>
        <label htmlFor="description">Description</label>
        <div className={descriptionEditor}>
          <DescriptionEditor
            editorState={description}
            onChange={setDescription}
            plugins={[hashtagPlugin]}
          />
        </div>
      </div>
      <div className={inputWrapper}>
        <label htmlFor="language">Langage</label>
        <select
          name="language"
          id="language"
          value={selectedLanguage}
          autoComplete="none"
          onChange={(e) => setSelectedLanguage(e.target.value)}
          required
        >
          {LANGUAGES.map((language) => (
            <option
              value={`${language.name} ${language.mode}`}
              key={language.name}
            >
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <EditorContainer
        language={selectedLanguage.split(" ").slice(-1)[0]}
        theme="dracula"
        value={snippet}
        onChange={setSnippet}
        required
      />
      <input
        type="submit"
        className={`${btn} bg-primary txt-btn`}
        role="button"
        value={btnValue}
        disabled={!canSave}
      />
    </form>
  );
};

export default NewPostForm;
