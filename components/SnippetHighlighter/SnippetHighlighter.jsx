import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';
import { LANGUAGES } from '../../lib/constants/languages';
// import 'highlight.js/styles/androidstudio.css';

const SnippetHighlighter = ({snippet, language}) => {
  console.log(language)
  const languageObj = LANGUAGES.filter((lang) => lang.name === language)[0];
  const formattedLanguage = languageObj?.short ?? languageObj.mode;

  const highlightedSnippet = hljs.highlight(snippet, {language: formattedLanguage});
  
  return (
    <>
      <pre>
        <code className="hljs" dangerouslySetInnerHTML={{__html: highlightedSnippet.value}}></code>
      </pre>
    </>
  );
};

export default SnippetHighlighter;
