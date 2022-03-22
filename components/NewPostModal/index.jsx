import { useAtom } from "jotai";
import { showNewPostModalAtom } from "store";
import { blocker, modal } from "./new_post_modal.module.scss";
import NewPostForm from "./NewPostForm";
import { useEffect } from "react";

const NewPostModal = (props) => {
  const {
    description,
    language,
    snippet,
    closeModal,
    id,
    post,
    setButtonDisabled,
  } = props;

  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);

  useEffect(() => {
    if (setButtonDisabled) setButtonDisabled(true);
    document.body.style.overflow = "hidden";
  }, [setButtonDisabled]);

  const handleClose = () => {
    setShowNewPostModal(false);
    if (closeModal) closeModal();
    if (setButtonDisabled) setButtonDisabled(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className={blocker} onClick={handleClose} />
      <div className={`${modal} bg-global-secondary`}>
        <h2>{post ? "Editer un snippet" : "Créer un snippet"}</h2>
        <NewPostForm
          editDescription={description}
          editLanguage={language}
          editSnippet={snippet}
          id={id}
          post={post}
        />
      </div>
    </>
  );
};

export default NewPostModal;
