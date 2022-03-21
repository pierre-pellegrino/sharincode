import { THEMES, THEMES_HASH } from "lib/constants/themes";
import dynamic from "next/dynamic";
import { Controlled as CodeMirror } from "react-codemirror2";
import { codeMirrorWrapper } from "../editor.module.scss";

const Editor = (props) => {
  const {
    language,
    theme,
    value,
    onChange,
  } = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  const options = {
    mode: language,
    screenReaderLabel: "Code editor",
    lineNumbers: true,
    firstLineNumber: true,
    lint: true,
    lineWrapping: true,
    scrollbarStyle: null,
    viewportMargin: Infinity,
    lineWrapping: true,
    smartIndent: true,
    extraKeys: {
      "Shift-Tab": "indentLess",
    },
    showInvisibles: false,
    autoCloseBrackets: true
  };

  return (
    <CodeMirror
      onBeforeChange={handleChange}
      value={value}
      options={options}
      className={codeMirrorWrapper}
    />
  );
};

export default Editor;
