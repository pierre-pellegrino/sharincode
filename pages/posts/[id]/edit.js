import NewPostForm from "components/NewPostModal/NewPostForm";
import APIManager from "pages/api/axios";

const CommentEdit = ({ data }) => {
  const { description, snippets } = data.post;

  console.log(snippets)

  return (
    <NewPostForm
      editDescription={description}
      editLanguage={snippets[0].language}
      editSnippet={snippets[0].content}
      post={data.post}
    />
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await APIManager.getPost(id);
  const data = await response.data;

  return {
    props: {
      id,
      data,
    },
  };
};

export default CommentEdit;
