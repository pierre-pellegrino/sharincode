import { useAtom } from "jotai";
import { showNewPostModalAtom } from "store";
import { blocker, modal } from "./new_post_modal.module.scss";
import NewPostForm from "./NewPostForm";

const NewPostModal = (props) => {
  const { description, language, snippet, closeModal, id, post } = props;

  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);

  const handleClose = () => {
    if (closeModal) return closeModal();
    setShowNewPostModal(false);
  };

  return (
    <>
      <div className={blocker} onClick={handleClose} />
      <div className={modal}>
        <h2>Créer un snippet</h2>
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
