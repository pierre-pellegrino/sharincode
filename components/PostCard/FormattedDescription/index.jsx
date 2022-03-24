import Link from "next/link";
import { description as descriptionStyle } from "../post_card.module.scss";

const FormattedDescription = ({ description }) => {
  const HASHTAG_FORMATTER = (string) => {
    return string
      .split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
      .filter(Boolean)
      .map((word, i) => {
        if (word.includes("#")) {
          return (
            <Link
              href={{ pathname: "/search", query: { q: word.replace("#", "").trim() } }}
            >
              <a className="txt-primary">{word}</a>
            </Link>
          );
        } else {
          return <span key={i}>{word}</span>;
        }
      });
  };

  return (
    <div className={descriptionStyle}>{HASHTAG_FORMATTER(description)}</div>
  );
};

export default FormattedDescription;
