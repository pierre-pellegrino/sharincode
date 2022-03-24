import {inputWrapper} from "../../new_post_modal.module.scss";
import {LANGUAGES} from "../../../../lib/constants/languages";
import EditorContainer from "../../../EditorContainer";
import {useEffect, useState} from "react";

const NewSnippetForm = ({
                          selectedLanguages,
                          handleLanguageChange,
                          snippets,
                          handleSnippetChange,
                          snippetNumber
                        }) => {

  const [snippet, setSnippet] = useState(snippets[snippetNumber])

  useEffect(() => {
    handleSnippetChange(snippet, snippetNumber)
  }, [snippet])

  return (
    <div>
      <div className={inputWrapper}>
        <label htmlFor="language">Langage</label>
        <select
          name="language"
          id="language"
          value={selectedLanguages[snippetNumber]}
          autoComplete="none"
          onChange={(e) => handleLanguageChange(e.target.value, snippetNumber)}
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
        language={selectedLanguages[snippetNumber].split(" ").slice(-1)[0]}
        theme="dracula"
        value={snippet}
        onChange={setSnippet}
        required
      />
    </div>
  )
}

export default NewSnippetForm
