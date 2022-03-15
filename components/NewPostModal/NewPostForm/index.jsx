import React from "react";

const NewPostForm = () => {
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
    </form>
  )
};

export default NewPostForm;
