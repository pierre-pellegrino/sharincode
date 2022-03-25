import { inputWrapper, actions } from "components/NewPostModal/new_post_modal.module.scss";
import { LANGUAGES } from "lib/constants/languages";
import EditorContainer from "components/EditorContainer";
import { useState } from "react";
import { CloseIcon } from "components/icons";

const NewSnippetForm = ({ snippet, snippets, setSnippets }) => {
  const [content, setContent] = useState(snippet.content);
  const [language, setLanguage] = useState(snippet.language);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setSnippets((prev) =>
      prev.map((prevSnippet) =>
        prevSnippet === snippet
          ? { ...prevSnippet, language: e.target.value }
          : prevSnippet
      )
    );
  };

  const handleContentChange = (e) => {
    setContent(e);
    setSnippets((prev) =>
      prev.map((prevSnippet) =>
        prevSnippet === snippet ? { ...prevSnippet, content: e } : prevSnippet
      )
    );
  };

  const handleDelete = () => {
    setSnippets((prev) =>
      prev.map((prevSnippet) =>
        prevSnippet === snippet
          ? { ...prevSnippet, destroy: true }
          : prevSnippet
      )
    );
  };

  return (
    <div>
      <div className={inputWrapper}>
        <div className={actions}>
          <label htmlFor="language">Langage</label>
          {snippets.filter((s) => s?.destroy !== true).length > 1 && (
            <button onClick={handleDelete}>
              <CloseIcon />
            </button>
          )}
        </div>
        <select
          name="language"
          id="language"
          value={language}
          autoComplete="none"
          onChange={handleLanguageChange}
          required
        >
          {LANGUAGES.map((lang) => (
            <option value={`${lang.name} ${lang.mode}`} key={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <EditorContainer
        language={language}
        value={content}
        onChange={handleContentChange}
        required
      />
    </div>
  );
};

export default NewSnippetForm;
