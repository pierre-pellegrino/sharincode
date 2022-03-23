import { useState, useEffect } from "react";

const useKeyPress = (target) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const handleDown = ({ key }) => {
    if (key === target) setKeyPressed(true);
  };

  const handleUp = ({ key }) => {
    if (key === target) setKeyPressed(false);
  };


  useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.addEventListener("keydown", handleDown);
      window.addEventListener("keyup", handleUp);
    };
  });

  return keyPressed;
};

export default useKeyPress;
