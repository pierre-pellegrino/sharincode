import Editor from "components/EditorContainer";
import React, { useState } from "react";

const NewPostForm = () => {
  const [html, setHtml] = useState("");

  return (
    <form>
      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />
      <label htmlFor="language">Langage</label>
      <select name="language" id="language">
        <option>Selectionne un langage stp</option>
        <option>Anglais (ptdr)</option>
        <option>Français (lol)</option>
        <option>Allemand (groze zauzisse)</option>
      </select>
      <Editor language="xml" theme="material" value={html} onChange={setHtml} />
    </form>
  );
};

export default NewPostForm;
