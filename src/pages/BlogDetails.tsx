import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  content: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean;
}

interface Props {
  blogs: Blog[];
  onEdit: (id: string) => void;
  onBookMark: (id: string, statues: boolean) => void;
}

const BlogDetails = ({ blogs, onBookMark, onEdit }: Props) => {
  const { blogId } = useParams<{ blogId: string }>();
  const blog = blogs.find((blog) => blog.id === blogId);

  if (!blog) return <p className="text-danger">Blog not found!</p>;
  return <BlogCard blog={blog} onBookMark={onBookMark} onEdit={onEdit} />
};

export default BlogDetails;
