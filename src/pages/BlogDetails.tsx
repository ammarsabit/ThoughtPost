import { Link, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  description: string;
  content: string;
  blogPhoto: string;
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
    <div>
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Blog</h1>
      </div>
      <div className="blog-detail-container">
        <BlogCard blog={blog} onBookMark={onBookMark} />
      </div>
      <div>
        <img
          src={blog.blogPhoto}
          className="image-fluid rounded mx-auto d-block h-20"
        ></img>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <Link to={"/editblog/" + blog.id} className={`text-decoration-none`}>
          <FaPen size={20} className="align-self-end" />
        </Link>
        <div>
          <FaTrashAlt
            size={30}
            color="red"
            className="mx-1 cursor-pointer"
            onClick={() => onDelete(blog.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
