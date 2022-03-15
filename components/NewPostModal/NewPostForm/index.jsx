import EditorContainer from "components/EditorContainer";
import { LANGUAGES } from "lib/contants";
import React, { useRef, useState } from "react";

const NewPostForm = () => {
  const [snippet, setSnippet] = useState("");
  const selectedLanguage = useRef();

  return (
    <form>
      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />
      <label htmlFor="language">Langage</label>
      <select name="language" id="language" ref={selectedLanguage}>
        {LANGUAGES.map((language) => (
          <option value={language.mode} key={language.name}>{language.name}</option>
        ))}
      </select>
      <EditorContainer language={selectedLanguage.current?.value} theme="dracula" value={snippet} onChange={setSnippet} />
    </form>
  );
};

export default NewPostForm;
