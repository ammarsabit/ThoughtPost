import BlogForm from "../components/BlogForm";
import NavBar from "../components/NavBar";

interface BlogInput {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
}

interface Props {
  onPost: (data: BlogInput) => void;
}

const CreateBlog = ({onPost}: Props) => {
  return (
    <>
      <NavBar />
      <BlogForm onPost={onPost}/>
    </>
  );
};

export default CreateBlog;
