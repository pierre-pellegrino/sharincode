import toHash from "tohash";

export const THEMES = Object.freeze([
  {
    id: "3024-night",
    name: "3024 Night",
    highlights: {
      text: "#d6d5d4",
      background: "#3a3432",
      gutters: "#090300",
      guttersBorder: "0px",
      guttermarker: "#db2d20",
      guttermarkerSubtle: "#5c5855",
      cursor: "1px solid #807d7c",
      lineNumber: "#5c5855",
      selected: "rgba(58, 52, 50, 0.99)",
      keyword: "#db2d20",
      atom: "#a16a94",
      number: "#a16a94",
      def: "#e8bbd0",
      property: "#01a252",
      variable: "#01a252",
      variable2: "#01a0e4",
      comment: "#cdab53",
      string: "#fded02",
      bracket: "#d6d5d4",
      tag: "#db2d20",
      attribute: "#01a252",
      link: "#a16a94",
      error: "#807d7c",
      errorBg: "db2d20",
      activeLine: "#2f2f2f",
      matchingBrackets: "white",
      matchingBracketsDecoration: "underline",
    }
  }
]);

export const THEMES_HASH = toHash(THEMES);
