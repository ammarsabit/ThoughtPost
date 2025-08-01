import { useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import BookmarkIcon from "../components/BookmarkIcon";
import BlogCard from "../components/UserCard";
import BlogTags from "../components/BlogTags";
import BlogForm, { formActionAtom } from "../components/BlogForm";
import { useAtom } from "jotai";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  occupation: string;
  description: string;
  content: string;
  blogPhoto: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean;
}

interface UpdatedBlog {
  blogId: string;
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
  PhotoData: FileList;
  Occupation: string;
}

interface Props {
  blogs: Blog[];
  errorMessage: string;
  onBookMark: (id: string, statues: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (data: UpdatedBlog) => void;
}

const BlogDetails = ({
  blogs,
  errorMessage,
  onBookMark,
  onDelete,
  onUpdate,
}: Props) => {
  const { blogId } = useParams<{ blogId: string }>();
  const [formAction, setFormAction] = useAtom(formActionAtom);
  const blog = blogs.find((blog) => blog.id === blogId);
  
  if (!blog) return <p className="text-danger">Blog not found!</p>;

  const onFormSubmit = (data: UpdatedBlog) => {
    onUpdate(data);
  };

  return (
    <>
      {formAction === true && (
        <BlogForm
          formSubmit={onFormSubmit}
          edit={{
            blogId: blog.id,
            title: blog.title,
            author: blog.author,
            description: blog.description,
            content: blog.content,
            tags: blog.tags,
            PhotoData: blog.blogPhoto,
            Occupation: blog.occupation,
          }}
        />
      )}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <div
        style={{ maxWidth: "900px" }}
        className=" mx-auto mt-5 position-relative blog-detail"
      >
        <div className="user-card">
          <BlogCard
            author={blog.author}
            avatar={blog.avatar}
            createdAt={blog.createdAt}
          />
          <h1 className="fw-bolder lh-sm">{blog.title}</h1>
          <BlogTags tags={blog.tags} />
        </div>

        <div className="d-flex position-absolute top-0 end-0">
          <div className="mx-1">
            <BookmarkIcon
              blogId={blog.id}
              bookmarked={blog.bookmarked}
              onBookMark={onBookMark}
            />
          </div>
          <div className="mx-1">
            <BiPencil
              size={30}
              className="align-self-end cursor-pointer"
              onClick={() => setFormAction(true)}
            />
          </div>
          <div>
            <FaTrashAlt
              size={30}
              color="red"
              className="mx-1 cursor-pointer"
              onClick={() => onDelete(blog.id)}
            />
          </div>
        </div>

        <div className="mt-5">
          <img
            src={blog.blogPhoto}
            className="img-fluid rounded mx-auto d-block"
          ></img>
        </div>
        <div
          style={{
            color: "#636363",
            width: "90%",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <p className="py-5">{blog.description}</p>

          <p className="">{blog.content}</p>
        </div>
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
    </>
  );
};

export default BlogDetails;
