import { useAtom } from "jotai";
import { showNewPostModalAtom } from "store";
import { blocker, modal } from "./new_post_modal.module.scss";
import NewPostForm from "./NewPostForm";

const NewPostModal = () => {
  const [_, setShowNewPostModal] = useAtom(showNewPostModalAtom);

  return (
    <>
      <div className={blocker} onClick={() => setShowNewPostModal(false)} />
      <div className={modal}>
        <h2>Créer un snippet</h2>
        <NewPostForm />
      </div>
    </>
  );
};

export default NewPostModal;
