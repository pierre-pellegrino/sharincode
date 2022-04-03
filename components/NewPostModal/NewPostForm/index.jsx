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
import { Editor as DescriptionEditor, convertFromRaw } from "draft-js";
import { createWithContent } from "draft-js/lib/EditorState";
import { createFromText } from "draft-js/lib/ContentState";
import uuid from "draft-js/lib/uuid";
import { extractHashtagsWithIndices } from "@draft-js-plugins/hashtag";
import HashtagLink from "components/Hashtag";
import { useEffect } from "react";
import { CompositeDecorator } from "draft-js";
import { HASHTAG_REGEX } from "lib/constants/validations";
import { useTranslation } from "next-i18next";

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
    },
  ],
});

const NewPostForm = ({
  editDescription,
  editSnippets,
  post,
  closeModal,
  setButtonDisabled,
}) => {
  const router = useRouter();
  const [_, setShowNewPostModalAtom] = useAtom(showNewPostModalAtom);
  const { t: common } = useTranslation("common");
  const { t } = useTranslation("post-editor");

  const [snippets, setSnippets] = useState(
    editSnippets
      ? editSnippets.map((snippet) => {
          const languageObj = LANGUAGES_HASH[snippet.language];
          return {
            ...snippet,
            language: `${languageObj.name} ${languageObj.mode}`,
            snippetId: uuid(),
          };
        })
      : [
          {
            content: "",
            language: `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`,
            snippetId: uuid(),
          },
        ]
  );

  const [description, setDescription] = useState(editDescription ?? "");

  const [descriptionEditorState, setDescriptionEditorState] = useState(
    createWithContent(emptyContentState)
  );

  useEffect(() => {
    const handleStrategy = (contentBlock, callback, contentState) => {
      findWithRegex(HASHTAG_REGEX, contentBlock, callback);
    };

    const findWithRegex = (regex, contentBlock, callback) => {
      const text = contentBlock.getText();
      let matchArr, start;
      while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
      }
    };

    const hashtagsDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HashtagLink,
      },
    ]);

    setDescriptionEditorState(
      createWithContent(
        createFromText(editDescription ?? ""),
        hashtagsDecorator
      )
    );

    setDescription(descriptionEditorState.getCurrentContent().getPlainText())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDescription]);

  const [btnValue, setBtnValue] = useState(
    editSnippets ? t("editPostBtn") : t("newPostBtn")
  );

  const { mutate } = useSWRConfig();

  const canSave = [
    snippets
      .filter((snippet) => snippet.destroy !== true)
      .every((snippet) => snippet.content !== ""),
    description,
  ].every(Boolean);
  
  const handleAddSnippet = (e) => {
    e.preventDefault();

    setSnippets([
      ...snippets,
      { content: "", language: `${LANGUAGES[0].name} ${LANGUAGES[0].mode}`, snippetId: uuid() },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!canSave) throw new Error(common("serverError"));

      setBtnValue(editSnippets ? t("savingEditBtn") : t("savingNewBtn"));

      const tags = extractHashtagsWithIndices(description).map(
        (tag) => tag.hashtag
      );

      const formatSnippets = () =>
        snippets.map((snippet) => ({
          ...snippet,
          language: snippet.language.split(" ").slice(0, -1).join(""),
        }));

      if (!editSnippets) {
        const data = {
          description: description,
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
        description: description,
        snippets: formatSnippets(),
        tags,
      };

      const response = await APIManager.editPost(post.id, data);

      await mutate("/posts");
      await mutate(`/posts/${post.id}`);

      if (closeModal) closeModal();
      if (setButtonDisabled) setButtonDisabled(false);

      router.push(`/posts/${response.data.post.id}`);
    } catch (err) {
      setBtnValue(
        editSnippets ? t("editPostBtn") : t("newPostBtn")
      );
      console.error(err);
    }
  };


  return (
    <form className={form} onSubmit={handleSubmit} style={{ overflow: "auto" }}>
      <div className={inputWrapper}>
        <label htmlFor="description">Description</label>
        <div className={descriptionEditor}>
          <DescriptionEditor
            editorKey="editor"
            editorState={descriptionEditorState}
            onChange={(editorState) => {
              setDescriptionEditorState(editorState);
              setDescription(editorState.getCurrentContent().getPlainText());
            }}
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
      {!editSnippets && (
        <button
          className={`${btn} bg-primary txt-btn`}
          onClick={(e) => handleAddSnippet(e)}
        >
          {t("addSnippet")}
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
