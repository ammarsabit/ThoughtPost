import { Link } from "react-router";
import BlogCard from "../components/UserCard";
import BookmarkIcon from "../components/BookmarkIcon";
import BlogTags from "../components/BlogTags";

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
          <div key={blog.id} className="mb-5 position-relative">
            <div className="mb-4">
              <BlogCard
                author={blog.author}
                avatar={blog.avatar}
                createdAt={blog.createdAt}
              />
              <h1 className="fw-bolder lh-sm mt-3">{blog.title}</h1>
              <BlogTags tags={blog.tags} />
            </div>
            <img
              src={blog.blogPhoto}
              alt={blog.title}
              className="img-fluid rounded-4 mx-auto d-block mt-3"
            />
            <p
              className="my-2 me-1 fw-medium"
              style={{
                color: "#636363",
                width: "90%",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {blog.description}{" "}
              <Link
                to={"/blogDetail/" + blog.id}
                className="text-decoration-none"
              >
                Read More
              </Link>
            </p>
            <div className="position-absolute top-0 end-0">
              <BookmarkIcon
                blogId={blog.id}
                bookmarked={blog.bookmarked}
                onBookMark={onBookMark}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookMarks;
