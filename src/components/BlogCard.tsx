import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  avatar: string;
  author: string;
  title: string;
  description?: string;
  content?: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
}
interface Props {
  blog: Post;
  onMore: (id: string) => void;
  onBookMark: (id: string, statues: boolean) => void;
  onEdit: (id: string) => void;
}

const BlogCard = ({ blog, onBookMark, onEdit }: Props) => {
  const [bookMarked, setBookMarked] = useState(false);

  return (
    <div className="card mb-3 blog-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex">
          <img
            src={blog.avatar}
            alt="author profile picture"
            className="rounded-circle align-self-center"
            width={60}
          />
          <div className="mx-3">
            <h2 className="fs-4 align-self-center">{blog.author}</h2>
            <h3 className="fs-6 text-secondary">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </h3>
          </div>
        </div>
        <Link
          className="fw-bolder fs-1 text-decoration-none text-dark"
          to={"/blogDetail/" + blog.id}
        >
          {blog.title}
        </Link>
        {blog.description && <p>{blog.description}</p>}
        <ul className="list-group list-group-horizontal list-unstyled mb-2">
          {blog.tags.split(" ").map((tag) => (
            <li key={tag} className="badge bg-primary me-1 mx-2">
              <span className="text-info">#</span>
              {tag}
            </li>
          ))}
        </ul>
        {blog.content && <p className="fs-3">{blog.content}</p>}
        {blog.editedAt && (
          <h3 className="fs-6 mt-4 text-secondary">
            edited {"  "}
            {new Date(blog.editedAt).toLocaleString("en-us", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </h3>
        )}
        <div className="d-flex justify-content-between mt-1">
          <FaPen
            size={20}
            className="align-self-end"
            onClick={() => onEdit(blog.id)}
          />
          <button className="btn">
            {bookMarked ? (
              <FaBookmark
                size={30}
                onClick={() => {
                  setBookMarked(false);
                  onBookMark(blog.id, false);
                }}
              />
            ) : (
              <FaRegBookmark
                size={30}
                onClick={() => {
                  setBookMarked(true);
                  onBookMark(blog.id, true);
                }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
