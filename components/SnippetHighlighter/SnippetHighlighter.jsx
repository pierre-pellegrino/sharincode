import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { LANGUAGES_HASH } from '../../lib/constants/languages';

const SnippetHighlighter = ({snippet, language}) => {
  const languageObj = LANGUAGES_HASH[language];
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
