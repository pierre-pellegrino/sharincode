const SetTheme = ({ highlights }) => (
  <style jsx global>
    {`
      // SCROLLBARS

      :root {
        --scroll-thumb: ${highlights.comment};
        --scroll-track: hsl(${highlights.background2});
      }

      // GLOBAL COLORS

      .bg-global {
        --hover: hsl(${highlights.background2});

        background-color: ${highlights.background};
      }

      .bg-global-secondary {
        --bg-secondary: hsl(${highlights.background2});

        --hover: ${highlights.background};

        --shadow-medium: 0.3px 0.5px 0.7px hsl(${highlights.shadow ?? highlights.background2} / 0.36),
        0.8px 1.6px 2px -0.8px hsl(${highlights.shadow ?? highlights.background2} / 0.36),
        2.1px 4.1px 5.2px -1.7px hsl(${highlights.shadow ?? highlights.background2} / 0.36),
        5px 10px 12.6px -2.5px hsl(${highlights.shadow ?? highlights.background2} / 0.36);

        --shadow-low:
          0.3px 0.5px 0.7px hsl(${highlights.shadow ?? highlights.background2} / 0.34),
          0.4px 0.8px 1px -1.2px hsl(${highlights.shadow ?? highlights.background2} / 0.34),
          1px 2px 2.5px -2.5px hsl(${highlights.shadow ?? highlights.background2} / 0.34);

        --border: ${highlights.border ?? "none"};

        background-color: hsl(${highlights.background2});
        box-shadow: var(--shadow-medium);
      }

      .txt-global {
        color: ${highlights.text};
      }

      .txt-btn {
        color: ${highlights.btnColor ?? "inherit"};
      }

      .bg-primary {
        background-color: ${highlights.switchColors ? highlights.keyword : highlights.def};
      }

      .bg-secondary {
        background-color: ${highlights.switchColors ? highlights.def : highlights.keyword};
      }

      .txt-primary {
        color: ${highlights.switchColors ? highlights.keyword : highlights.def};
      }

      .txt-secondary {
        color: ${highlights.switchColors ? highlights.def : highlights.keyword};
      }

      .fill-primary {
        fill: ${highlights.switchColors ? highlights.keyword : highlights.def};
      }

      .fill-secondary {
        fill: ${highlights.switchColors ? highlights.def : highlights.keyword};
      }

      .stroke-primary {
        stroke: ${highlights.switchColors ? highlights.keyword : highlights.def};
      }

      .stroke-secondary {
        stroke: ${highlights.switchColors ? highlights.def : highlights.keyword};
      }

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
        background-color: ${highlights.gutters} !important;
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

      .cm-keyword,
      .hljs-keyword {
        color: ${highlights.keyword} !important;
      }
      .cm-atom,
      .hljs-literal {
        color: ${highlights.atom} !important;
      }
      .cm-number,
      .hljs-number {
        color: ${highlights.number} !important;
      }
      .cm-def,
      .hljs-params,
      .hljs-title {
        color: ${highlights.def} !important;
      }
      .cm-punctuation {
        color: ${highlights.punctuation} !important;
      }
      .cm-property,
      .hljs-property,
      .hljs-attr {
        color: ${highlights.property} !important;
      }
      .cm-operator {
        color: ${highlights.operator} !important;
      }
      .cm-variable,
      .hljs-title {
        color: ${highlights.variable} !important;
      }
      .cm-variable-2,
      .hljs-subst {
        color: ${highlights.variable2 || highlights.variable} !important;
      }
      .cm-variable-3 {
        color: ${highlights.variable3 || highlights.variable} !important;
      }
      .cm-type {
        color: ${highlights.type} !important;
      }
      .cm-comment,
      .hljs-comment {
        color: ${highlights.comment} !important;
      }
      .cm-string,
      .hljs-string {
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
      .cm-tag,
      .hljs-tag,
      .hljs-name {
        color: ${highlights.tag} !important;
      }
      .cm-attribute,
      .hljs-attr {
        color: ${highlights.attribute} !important;
      }
      .cm-hr {
        color: ${highlights.hr} !important;
      }
      .cm-link {
        color: ${highlights.link} !important;
      }
      .cm-special {
        color: ${highlights.special} !important;
      }
      .cm-header {
        color: ${highlights.header} !important;
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
        background-color: ${highlights.matchingBracketsBg} !important;
        outline: ${highlights.matchingBracketsOutline} !important;
      }
    `}
  </style>
);

export default SetTheme;
