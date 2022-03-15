import { editorContainer } from "./editor.module.scss";
import dynamic from "next/dynamic";
import { LANGUAGES } from "lib/contants";

const Editor = dynamic(
  () => {
    import("codemirror/lib/codemirror.css");
    
    LANGUAGES.filter(
      (language) => language.mode !== "text" && language.mode !== "apache"
    ).forEach(
      (language) => import(`codemirror/mode/${language.mode}/${language.mode}.js`)
    );

    import("codemirror/theme/dracula.css");
    import("codemirror/addon/edit/closebrackets");
    import("codemirror/addon/lint/lint");
    return import("./Editor");
  },
  { ssr: false }
);
  
const EditorContainer = (props) => {
  const { language, theme, value, onChange } = props;

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
