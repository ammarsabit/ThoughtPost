import BlogForm from "../components/BlogForm";

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

const CreateBlog = ({ onPost }: Props) => {
  return <BlogForm onPost={onPost} />;
};

export default CreateBlog;
