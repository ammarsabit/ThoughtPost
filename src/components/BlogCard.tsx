import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { themeAtom } from "../App";

interface Blog {
  id: string;
  avatar: string;
  author: string;
  title: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
}

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  const [theme] = useAtom(themeAtom);

  return (
    <div className={`page-${theme} position-relative`}>
      <div className="d-flex flex-column ms-3 mt-3">
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
          className={`fw-bolder fs-1 text-decoration-none page-${theme}`}
          to={"/blogDetail/" + blog.id}
        >
          {blog.title}
        </Link>
        <ul className="list-group list-group-horizontal list-unstyled mb-2">
          {blog.tags.split(" ").map((tag) => (
            <li key={tag} className="badge bg-primary me-1 mx-2">
              <span className="text-info">#</span>
              {tag}
            </li>
          ))}
        </ul>

        {blog.editedAt && (
          <h3 className="fs-6 mt-4 text-secondary">
            edited {"  "}
            {new Date(blog.editedAt).toLocaleString("en-us", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </h3>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
