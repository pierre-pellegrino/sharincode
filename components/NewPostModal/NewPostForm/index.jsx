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
import NewSnippetForm from "./NewSnippetForm";

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

  const [description, setDescription] = useState(editDescription ?? "");
  // const [snippet, setSnippet] = useState(editSnippet ?? "");
  // const [selectedLanguage, setSelectedLanguage] = useState(() => {
  //   if (!editLanguage) return `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`;
  //
  //   const languageObj = LANGUAGES.filter(
  //     (lang) => lang.name === editLanguage
  //   )[0];
  //
  //   return `${languageObj.name} ${languageObj.mode}`;
  // });
  const [snippets, setSnippets] = useState([""])
  const [selectedLanguages, setSelectedLanguages] = useState([`${LANGUAGES[0].name} ${LANGUAGES[0].mode}`])
  const [btnValue, setBtnValue] = useState(
    editSnippet ? "Editer mon snippet" : "Partager mon code au monde ! 🚀"
  );
  const [snippetCounter, setSnippetCounter] = useState(["1"])

  const { mutate } = useSWRConfig();

  useEffect(() => {
    descriptionRef.current.focus();
  }, []);

  const canSave = [
    snippets[0],
    description,
    selectedLanguages[0].split(" ").slice(0, -1).join(" "),
  ].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!canSave) throw new Error("Oups, quelque chose s'est mal passé !");

      setBtnValue(editSnippet ? "Edition en cours..." : "Création en cours...");

      if (!editSnippet) {
        const data = {
          description: description,
          snippets: [
            {
              content: snippets[0],
              language: selectedLanguage[0].split(" ").slice(0, -1).join(" "),
            },
          ],
          tags: [],
        };

        const response = await APIManager.createPost(data);
        setShowNewPostModalAtom(false);

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
            content: snippets[0],
            language: selectedLanguage[0].split(" ").slice(0, -1).join(" "),
          },
        ],
      };
      
      const response = await APIManager.editPost(post.id, data);
      
      await mutate(`/posts/${post.id}`);
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

  const handleSetSnippetCount = () => {
    setSnippetCounter([...snippetCounter, '1'])
    setSelectedLanguages([...selectedLanguages, `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`])
  }

  const handleLanguageChange = (value, id) => {
    const tmpArr = [...selectedLanguages]
    tmpArr[id] = value
    setSelectedLanguages(tmpArr)
  }

  const handleSnippetChange = (value, id) => {
    const tmpArr = [...snippets]
    tmpArr[id] = value
    setSnippets(tmpArr)
  }

  return (
    <form className={form} onSubmit={handleSubmit} style={{overflow: 'auto'}}>
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
      {
        snippetCounter.map((e, index) => (
          <NewSnippetForm
            selectedLanguages={selectedLanguages}
            handleLanguageChange={handleLanguageChange}
            snippets={snippets}
            handleSnippetChange={handleSnippetChange}
            key={index}
            snippetNumber={index}
          />
        ))
      }
      <button className={`${btn} bg-primary txt-btn`} onClick={handleSetSnippetCount}>ajouter un snippet</button>
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
