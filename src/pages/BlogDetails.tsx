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
  onBookMark: (id: string, statues: boolean) => void;
  onDelete: (id: string) => void;
}

const BlogDetails = ({ blogs, onBookMark, onDelete }: Props) => {
  const { blogId } = useParams<{ blogId: string }>();
  const blog = blogs.find((blog) => blog.id === blogId);
  if (!blog) return <p className="text-danger">Blog not found!</p>;

  return (
    <>
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Blog</h1>
      </div>
      <div className="blog-detail-container">
        <BlogCard blog={blog} onBookMark={onBookMark} onDelete={onDelete} />
      </div>
    </>
  );
};

export default BlogDetails;
