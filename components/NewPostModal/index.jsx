import { useAtom } from "jotai";
import { showNewPostModalAtom } from "store";
import { blocker, modal } from "./new_post_modal.module.scss";
import NewPostForm from "./NewPostForm";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";

const NewPostModal = (props) => {
  const { description, snippetList, closeModal, id, post, setButtonDisabled } =
    props;

  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);
  const { t } = useTranslation("post-editor");

  useEffect(() => {
    if (setButtonDisabled) setButtonDisabled(true);
  }, [setButtonDisabled]);

  const handleClose = () => {
    setShowNewPostModal(false);
    if (closeModal) closeModal();
    if (setButtonDisabled) setButtonDisabled(false);
  };

  return (
    <>
      <div className={blocker} onClick={handleClose} />
      <div className={`${modal} bg-global-secondary`}>
        <h2>{post ? t("modalTitleEdit") : t("modalTitleNew")}</h2>
        <NewPostForm
          editDescription={description}
          editSnippets={snippetList}
          id={id}
          post={post}
          closeModal={closeModal}
          setButtonDisabled={setButtonDisabled}
        />
      </div>
    </>
  );
};

export default NewPostModal;
