import EditorContainer from "components/EditorContainer";
import { LANGUAGES } from "lib/constants/languages";
import { useRef, useState } from "react";
import { form, inputWrapper } from "../new_post_modal.module.scss";
import { btn } from "components/forms/form.module.scss";
import { useEffect } from "react";
import APIManager from "pages/api/axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { showNewPostModalAtom } from "store";
import { useSWRConfig } from "swr";

const NewPostForm = ({
  editDescription,
  editLanguage,
  editSnippet,
  post,
}) => {
  const descriptionRef = useRef();
  const router = useRouter();
  const [_, setShowNewPostModalAtom] = useAtom(showNewPostModalAtom);

  const [description, setDescription] = useState(editDescription ?? "");
  const [snippet, setSnippet] = useState(editSnippet ?? "");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (!editLanguage) return `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`;

    const languageObj = LANGUAGES.filter(
      (lang) => lang.name === editLanguage
    )[0];

    return `${languageObj.name} ${languageObj.mode}`;
  });

  const { mutate } = useSWRConfig();

  useEffect(() => {
    descriptionRef.current.focus();
  }, []);

  const canSave = [
    snippet,
    description,
    selectedLanguage.split(" ").slice(0, -1).join(" "),
  ].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!canSave) throw new Error("Oups, quelque chose s'est mal passé !");

      console.log(post);

      if (!editSnippet) {
        const data = {
          description: description,
          snippets: [
            {
              content: snippet,
              language: selectedLanguage.split(" ").slice(0, -1).join(" "),
            },
          ],
          tags: [],
        };

        const response = await APIManager.createPost(data);
        setShowNewPostModalAtom(false);
        console.log(response.data);

        await mutate("/posts");

        router.push(`/posts/${response.data.post.id}`);

        return;
      }

      const data = {
        ...post,
        description,
        snippets: [
          {
            ...post.snippets[0],
            content: snippet,
            language: selectedLanguage.split(" ").slice(0, -1).join(" "),
          },
        ],
      };

      const response = await APIManager.editPost(post.id, data);
      console.log(response.data);

      await mutate("/posts");

      router.push(`/posts/${response.data.post.id}`);

      return;
    } catch (e) {
      console.error(e.response);
    }
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <div className={inputWrapper}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
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
        value="Partager mon code au monde ! 🚀"
        disabled={!canSave}
      />
    </form>
  );
};

export default NewPostForm;
