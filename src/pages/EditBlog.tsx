import BlogForm from "../components/BlogForm";
import { useParams } from "react-router";

interface Blog {
  author: string;
  description: string;
  content: string;
  tags: string;
  blogPhoto: string;
}

interface FormInput {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
}

interface Blog extends FormInput {
  id: string;
  avatar: string;
  title: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean;
}

interface Props {
  blogs: Blog[];
  onUpdate: (UpdatedBlog: Blog) => void;
}

const EditBlog = ({ blogs, onUpdate }: Props) => {
  const { blogId } = useParams<{ blogId: string }>();
  const blogWithId = blogs.find((blog) => blog.id === blogId);

  if (!blogWithId) return <p className="text-danger">Blog not Found</p>;

  const toEdit = {
    title: blogWithId.title,
    author: blogWithId.author,
    description: blogWithId.description,
    content: blogWithId.content,
    tags: blogWithId.tags,
    blogPhoto: blogWithId.blogPhoto,
  };

  const handleSubmit = (data: FormInput) => {
    if (!blogWithId) return;
    onUpdate({ ...data, id: blogId } as Blog);
  };

  return (
    <div>
      <BlogForm edit={toEdit} formSubmit={handleSubmit} />
    </div>
  );
};

export default EditBlog;
