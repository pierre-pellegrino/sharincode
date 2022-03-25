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
import NewSnippetForm from "./NewSnippetForm";
import DescriptionEditor, {
  createEditorStateWithText,
} from "@draft-js-plugins/editor";
import createHashtagPlugin, {
  extractHashtagsWithIndices,
} from "@draft-js-plugins/hashtag";
import HashtagLink from "components/Hashtag";
import { useEffect } from "react";
import { CloseIcon } from 'components/icons'

const NewPostForm = ({
  editDescription,
  editSnippet,
  post,
  closeModal,
  setButtonDisabled,
}) => {
  const descriptionRef = useRef();
  const router = useRouter();
  const [_, setShowNewPostModalAtom] = useAtom(showNewPostModalAtom);


  const [selectedLanguages, setSelectedLanguages] = useState(() => {
    if (!editSnippet) return [`${LANGUAGES[0].name} ${LANGUAGES[0].mode}`];

    const languages = []
    editSnippet.forEach((snippet) => {
      const languageObj = LANGUAGES.filter(
        (lang) => lang.name === snippet.language
      )[0];

      languages.push(`${languageObj.name} ${languageObj.mode}`) ;
    })
    return languages
  });

  const [snippets, setSnippets] = useState(() => {
    if (!editSnippet) return [''];

    const snippets = []

    editSnippet.forEach((snippet) => {
      snippets.push(snippet.content)
    })

    return snippets
  })

  const [description, setDescription] = useState(
    createEditorStateWithText(editDescription ?? "")
  );

  const [btnValue, setBtnValue] = useState(
    editSnippet ? "Editer mon snippet" : "Partager mon code au monde ! 🚀"
  );

  const hashtagPlugin = createHashtagPlugin({ hashtagComponent: HashtagLink });

  const { mutate } = useSWRConfig();

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

      const tags = extractHashtagsWithIndices(
        description.getCurrentContent().getPlainText()
      ).map((tag) => tag.hashtag);

      const formatSnippets = () => {
        const formattedSnippets = []

        if (!editSnippet) {
          snippets.forEach((snippet, index) => {
            formattedSnippets.push({
              content: snippet,
              language: selectedLanguages[index].split(" ").slice(0, -1).join(" "),
            })
          })
        } else {
          editSnippet.forEach((snippet, index) => {
            if (snippet.content === 'destroy') {
              formattedSnippets.push({
                id: editSnippet[index].id,
                destroy: true,
              })
            } else {
              formattedSnippets.push({
                id: editSnippet[index].id,
                content: snippet.content,
                language: selectedLanguages[index].split(" ").slice(0, -1).join(" "),
              })
            }
          })
        }

        return formattedSnippets
      }

      if (!editSnippet) {
        const data = {
          description: description.getCurrentContent().getPlainText(),
          snippets: formatSnippets(),
          tags,
        };

        const response = await APIManager.createPost(data);
        setShowNewPostModalAtom(false);

        await mutate("/posts");

        router.push(`/posts/${response.data.post.id}`);

        return;
      }

      const data = {
        description: description.getCurrentContent().getPlainText(),
        snippets: formatSnippets(),
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

  const handleSetSnippetCount = (e) => {
    e.preventDefault();
    setSelectedLanguages([...selectedLanguages, `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`])
    setSnippets([...snippets, ''])
  }

  const handleLanguageChange = (value, id) => {
    selectedLanguages[id] = value
    setSelectedLanguages([...selectedLanguages])
  }

  const handleSnippetChange = (value, id) => {
    snippets[id] = value
    setSnippets(snippets)
    if (editSnippet) editSnippet[id].content = value
  }

  const removeSnippet = (id, e) => {
    e.preventDefault()
    if (!editSnippet) {
      setSnippets((oldState) => [...oldState.slice(0, id), ...oldState.slice(id + 1)])
      setSelectedLanguages((oldState) => [...oldState.slice(0, id), ...oldState.slice(id + 1)])
    } else {
      editSnippet[id].content = 'destroy'
      setSnippets((oldState) => [...oldState.slice(0, id), ...oldState.slice(id + 1)])
      setSelectedLanguages((oldState) => [...oldState.slice(0, id), ...oldState.slice(id + 1)])
    }
  }

  return (
    <form className={form} onSubmit={handleSubmit} style={{overflow: 'auto'}}>
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
      {
        snippets.map((e, index) => (
          <NewSnippetForm
            selectedLanguages={selectedLanguages}
            handleLanguageChange={handleLanguageChange}
            snippets={snippets}
            handleSnippetChange={handleSnippetChange}
            key={index}
            snippetNumber={index}
            removeSnippet={removeSnippet}
            totalSnippetCount={snippets.length}
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
