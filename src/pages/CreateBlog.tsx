import BlogForm from "../components/BlogForm";

interface BlogInput {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
}

interface Props {
  onFormSubmit: (data: BlogInput) => void;
}

const CreateBlog = ({ onFormSubmit }: Props) => {
  return <BlogForm formSubmit={ onFormSubmit } />;
};

export default CreateBlog;
