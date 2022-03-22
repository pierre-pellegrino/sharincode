import { useAtom } from "jotai";
import { THEMES } from "lib/constants/themes";
import React from "react";
import { preferedThemeAtom } from "store";

const ThemeSelect = () => {
  const [preferedTheme, setPreferedTheme] = useAtom(preferedThemeAtom);

  return (
    <select
      className="bg-global"
      value={preferedTheme}
      onChange={(e) => setPreferedTheme(e.target.value)}
    >
      {THEMES.map((theme) => (
        <option value={theme.id} key={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelect;
