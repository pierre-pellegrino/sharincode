import { icon, nice, bad } from "./validation_icon.module.scss";

const ValidationIcon = ({ isValid }) => {
  if (!isValid) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#e63946"
        aria-hidden="true"
        focusable="false"
        className={`${icon} ${bad}`}
      >
        <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59 L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59z"></path>
      </svg>
    );
  }
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#38b000"
      aria-hidden="true"
      focusable="false"
      className={`${icon} ${nice}`}
    >
      <path d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z"></path>
    </svg>
  );
};

export default ValidationIcon;