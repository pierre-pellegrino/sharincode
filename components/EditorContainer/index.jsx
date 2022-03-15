import { editorContainer } from "./editor.module.scss";
import dynamic from "next/dynamic";


const EditorContainer = (props) => {
  const { language, theme, value, onChange } = props;

  const Editor = dynamic(() => {
    import("codemirror/lib/codemirror.css");
    import("codemirror/mode/javascript/javascript");
    import("codemirror/theme/material.css");
    return import("./Editor");
  }, { ssr: false });

  return (
    <div className={editorContainer}>
      <Editor
        language={language}
        theme={theme}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default EditorContainer;
