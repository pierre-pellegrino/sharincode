import { LANGUAGES, LANGUAGES_HASH } from "lib/constants/languages";
import { useState } from "react";
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
import uuid from "draft-js/lib/uuid";

const NewPostForm = ({
  editDescription,
  editSnippet,
  post,
  closeModal,
  setButtonDisabled,
}) => {
  const router = useRouter();
  const [_, setShowNewPostModalAtom] = useAtom(showNewPostModalAtom);

  const [snippets, setSnippets] = useState(
    editSnippet
      ? editSnippet.map((snippet) => {
          const languageObj = LANGUAGES_HASH[snippet.language];
          return {
            ...snippet,
            language: `${languageObj.name} ${languageObj.mode}`,
            snippetId: uuid()
          };
        })
      : [{ content: "", language: `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`, snippetId: uuid() }]
  );

  const [description, setDescription] = useState(
    createEditorStateWithText(editDescription ?? "")
  );

  const [btnValue, setBtnValue] = useState(
    editSnippet ? "Editer mon snippet" : "Partager mon code au monde ! 🚀"
  );

  const hashtagPlugin = createHashtagPlugin({ hashtagComponent: HashtagLink });

  const { mutate } = useSWRConfig();

  const canSave = [
    snippets[0]?.content,
    description,
  ].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!canSave) throw new Error("Oups, quelque chose s'est mal passé !");

      setBtnValue(editSnippet ? "Edition en cours..." : "Création en cours...");

      const tags = extractHashtagsWithIndices(
        description.getCurrentContent().getPlainText()
      ).map((tag) => tag.hashtag);

      const formatSnippets = () =>
        snippets.map((snippet) => ({
          ...snippet,
          language: snippet.language.split(" ").slice(0, -1).join(""),
        }));

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

  const handleAddSnippet = () => {
    setSnippets([
      ...snippets,
      { content: "", language: `${LANGUAGES[0].name} ${LANGUAGES[0].mode}` },
    ]);
  };

  return (
    <form className={form} onSubmit={handleSubmit} style={{ overflow: "auto" }}>
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
      {snippets
        .filter((snippet) => snippet?.destroy !== true)
        .map((snippet) => (
          <NewSnippetForm
            snippet={snippet}
            key={snippet.snippetId}
            setSnippets={setSnippets}
            snippets={snippets}
          />
        ))}
      {!editSnippet && (
        <button
          className={`${btn} bg-primary txt-btn`}
          onClick={handleAddSnippet}
        >
          Ajouter un snippet
        </button>
      )}
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
