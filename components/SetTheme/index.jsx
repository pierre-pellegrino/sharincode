const SetTheme = ({ highlights }) => (
  <style jsx global>
    {`
      // GLOBAL

      .CodeMirror,
      .hljs {
        color: ${highlights.text} !important;
        background-color: ${highlights.background} !important;
      }

      .CodeMirror-guttermarker {
        color: ${highlights.guttermarker} !important;
      }

      .ColorMirror-guttermarker-subtle {
        color: ${highlights.guttermarkerSubtle};
      }

      .CodeMirror-gutters {
        color: ${highlights.gutters} !important;
        border-right: ${highlights.guttersBorder} !important;
      }

      .CodeMirror-cursor {
        border-left: ${highlights.cursor} !important;
      }

      .CodeMirror-linenumber {
        color: ${highlights.lineNumber} !important;
      }

      .CodeMirror-selected,
      .CodeMirror-line::selection,
      .CodeMirror-line > span::selection,
      .CodeMirror-line > span > span::selection,
      .CodeMirror-line::-moz-selection,
      .CodeMirror-line > span::-moz-selection,
      .CodeMirror-line > span > span::-moz-selection,
      .hljs::selection,
      .hljs ::selection {
        background: ${highlights.selected} !important;
      }

      // VARIABLES

      .cm-keyword {
        color: ${highlights.keyword} !important;
      }
      .cm-atom {
        color: ${highlights.atom} !important;
      }
      .cm-number {
        color: ${highlights.number} !important;
      }
      .cm-def {
        color: ${highlights.def} !important;
      }
      .cm-punctuation {
        color: ${highlights.punctuation} !important;
      }
      .cm-property {
        color: ${highlights.property} !important;
      }
      .cm-operator {
        color: ${highlights.operator} !important;
      }
      .cm-variable {
        color: ${highlights.variable} !important;
      }
      .cm-variable-2 {
        color: ${highlights.variable2 || highlights.variable} !important;
      }
      .cm-variable-3 {
        color: ${highlights.variable3 || highlights.variable} !important;
      }
      .cm-type {
        color: ${highlights.type} !important;
      }
      .cm-comment {
        color: ${highlights.comment} !important;
      }
      .cm-string {
        color: ${highlights.string} !important;
      }
      .cm-string-2 {
        color: ${highlights.string2 || highlights.string} !important;
      }
      .cm-meta {
        color: ${highlights.meta} !important;
      }
      .cm-qualifier {
        color: ${highlights.qualifier} !important;
      }
      .cm-builtin {
        color: ${highlights.builtIn} !important;
      }
      .cm-bracket {
        color: ${highlights.bracket} !important;
      }
      .cm-tag {
        color: ${highlights.tag} !important;
      }
      .cm-attribute {
        color: ${highlights.attribute} !important;
      }
      .cm-hr {
        color: ${highlights.hr} !important;
      }
      .cm-link {
        color: ${highlights.link} !important;
      }
      .cm-error {
        color: ${highlights.error} !important;
        background: ${highlights.error};
      }

      // EXTENSIONS

      .CodeMirror-activeline-background {
        background: ${highlights.activeLine} !important;
      }

      .CodeMirror-matchingbrackets {
        text-decoration: ${highlights.matchingBracketsDecoration} !important;
        color: ${highlights.matchingBrackets} !important;
      }
    `}
  </style>
);

export default SetTheme;
