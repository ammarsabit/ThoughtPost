import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { themeAtom } from "../App";
import { FaTrashAlt } from "react-icons/fa";

interface Post {
  id: string;
  avatar: string;
  author: string;
  title: string;
  description?: string;
  blogPhoto: string;
  content?: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean;
}

interface Props {
  blog: Post;
  onBookMark: (id: string, statues: boolean) => void;
  onDelete: (id: string) => void;
}

const BlogCard = ({ blog, onBookMark, onDelete }: Props) => {
  const [bookMarked, setBookMarked] = useState(false);
  const [theme] = useAtom(themeAtom);

  return (
    <div className={`card m-3 blog-card p-3 page-${theme}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-sm-between">
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
          <button
            className="btn btn-small"
            onClick={() => {
              setBookMarked(!bookMarked);
              onBookMark(blog.id, bookMarked);
            }}
          >
            {blog.bookmarked ? (
              <FaBookmark color="#ff6a00" size={30} />
            ) : (
              <FaRegBookmark color="#ff6a00" size={30} />
            )}
          </button>
        </div>
        <Link
          className={`fw-bolder fs-1 text-decoration-none page-${theme}`}
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
        
        {blog.content && <p className="fs-5 blog-content">{blog.content}</p>}
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
          <Link
            to={"/editblog/" + blog.id}
            className={`text-decoration-none page-${theme}`}
          >
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

        <div >
          <img src={blog.blogPhoto} className="image-fluid rounded mx-auto d-block h-20"></img>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
