import { editorContainer, loaderContainer } from "./editor.module.scss";
import dynamic from "next/dynamic";
import { LANGUAGES } from "lib/constants/languages";
import Loader from "components/Loader";

const Editor = dynamic(
  () => {
    import("codemirror/lib/codemirror.css");

    LANGUAGES.filter((language) => language.mode !== "text").forEach(
      (language) =>
        import(`codemirror/mode/${language.mode}/${language.mode}.js`)
    );

    // import("codemirror/theme/3024-day.css");
    import("codemirror/addon/edit/closebrackets");
    import("codemirror/addon/lint/lint");
    import("codemirror/addon/edit/matchbrackets");
    import("codemirror/addon/selection/active-line");
    return import("./Editor");
  },
  {
    ssr: false,
    loading: () => (
      <div className={loaderContainer}>
        <Loader />
      </div>
    ),
  }
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
        number={3}
        boolean={false}
      />
    </div>
  );
};

export default EditorContainer;
