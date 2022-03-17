import EditorContainer from "components/EditorContainer";
import { LANGUAGES } from "lib/constants/languages";
import { useRef, useState } from "react";
import { form, inputWrapper } from "../new_post_modal.module.scss";
import { btn } from "components/forms/form.module.scss";
import { useEffect } from "react/cjs/react.development";
import APIManager from "pages/api/axios";
import {useRouter} from "next/router";
import {useAtom} from 'jotai';
import {showNewPostModalAtom} from 'store';

const NewPostForm = () => {
  const descriptionRef = useRef();
  const router = useRouter();
  const [_,setShowNewPostModalAtom] = useAtom(showNewPostModalAtom);

  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(`${LANGUAGES[0].name} ${LANGUAGES[0].mode}`);
  const [snippet, setSnippet] = useState("");

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

      const data = {
        description: description,
        snippets: [
            {
                content: snippet,
                language: selectedLanguage.split(" ").slice(0, -1).join(" ")
            }
        ]
      }

      const response = await APIManager.createPost(data);
      console.log(response.data)
      router.push(`/posts/${response.data.post.id}`);
      setShowNewPostModalAtom(false);

      // console.group("%cPost créé !", "font-size: 20px; color: #009DFF;");
      // console.table(data);
      // console.groupEnd();
    } catch (e) {
      console.error(e.message);
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
        className={btn}
        role="button"
        value="Partager mon code au monde ! 🚀"
        disabled={!canSave}
      />
    </form>
  );
};

export default NewPostForm;
