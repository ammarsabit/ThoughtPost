import { Link } from "react-router";
import BlogCard from "../components/BlogCard";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  description: string;
  blogPhoto: string;
  tags: string;
  createdAt: string;
  bookmarked: boolean;
}

interface Props {
  blogs: Blog[];
  onBookMark: (id: string, statues: boolean) => void;
}

const BookMarks = ({ blogs, onBookMark }: Props) => {
  return (
    <div style={{ maxWidth: "900px" }} className="mx-auto pt-5">
      {blogs
        .filter((blog) => blog.bookmarked)
        .map((blog) => (
          <div key={blog.id} className="mb-5">
            <BlogCard blog={blog} onBookMark={onBookMark} />
            <img
              src={blog.blogPhoto}
              alt={blog.title}
              className="img-fluid rounded-4 mx-auto d-block mt-3"
            />
            <p className="my-2 me-1 fw-medium">
              {blog.description} <Link to={"/blogDetail/" + blog.id} className="text-decoration-none">Read More</Link>
            </p>
          </div>
        ))}
    </div>
  );
};

export default BookMarks;
