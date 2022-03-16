import EditorContainer from "components/EditorContainer";
import { LANGUAGES } from "lib/constants/languages";
import { useRef, useState } from "react";
import { form, inputWrapper } from "../new_post_modal.module.scss";
import { btn } from "components/forms/form.module.scss";

const NewPostForm = () => {
  const [snippet, setSnippet] = useState("");
  const description = useRef("");
  const selectedLanguage = useRef();

  const canSave = [
    snippet,
    description.current.value,
    selectedLanguage.current?.value.split(" ").slice(0, -1).join(" "),
  ].every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (!canSave) throw new Error("Oups, quelque chose s'est mal passé !")

      const data = {
        snippet,
        description: description.current.value,
        language: selectedLanguage.current?.value.split(" ").slice(0, -1).join(" "),
      }
  
      console.group("%cPost créé !", "font-size: 20px; color: #009DFF;");
      console.table(data);
      console.groupEnd();
    } catch(e) {
      console.error(e.message)
    }
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <div className={inputWrapper}>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" ref={description} />
      </div>
      <div className={inputWrapper}>
        <label htmlFor="language">Langage</label>
        <select name="language" id="language" ref={selectedLanguage}>
          {LANGUAGES.map((language) => (
            <option value={`${language.name} ${language.mode}`} key={language.name}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <EditorContainer
        language={selectedLanguage.current?.value.split(" ").slice(-1)[0]}
        theme="dracula"
        value={snippet}
        onChange={setSnippet}
      />
      <input
        type="submit"
        className={btn}
        value="Partager mon code au monde ! 🚀"
      />
    </form>
  );
};

export default NewPostForm;
