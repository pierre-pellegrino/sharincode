import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';
// import 'highlight.js/styles/androidstudio.css';

const SnippetHighlighter = ({snippet, language}) => {
  const highlightedSnippet = hljs.highlight(snippet, {language: language});
  return (
    <>
      <pre>
        <code className="hljs" dangerouslySetInnerHTML={{__html: highlightedSnippet.value}}></code>
      </pre>
    </>
  );
};

export default SnippetHighlighter;