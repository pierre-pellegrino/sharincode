import { useAtom } from "jotai";
import { THEMES } from "lib/constants/themes";
import React from "react";
import { preferedThemeAtom } from "store";
import { inputWrapper } from "components/NewPostModal/new_post_modal.module.scss";

const ThemeSelect = () => {
  const [preferedTheme, setPreferedTheme] = useAtom(preferedThemeAtom);

  return (
    <div className={inputWrapper}>
      <select
        style={{ borderRadius: "4px" }}
        className="bg-global"
        value={preferedTheme}
        onChange={(e) => setPreferedTheme(e.target.value)}
      >
        {THEMES.map((theme) =>
          theme.highlights?.matrix ? (
            <option
              value={theme.id}
              key={theme.id}
              style={{
                fontFamily: "monospace",
                backgroundColor: "black",
                color: "#00ff00",
              }}
            >
              {theme.name}
            </option>
          ) : (
            <option value={theme.id} key={theme.id}>
              {theme.name}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default ThemeSelect;
