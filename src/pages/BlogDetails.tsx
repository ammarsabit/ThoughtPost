import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean
}

interface Props {
  onEdit: (id: string) => void;
  onBookMark: (id: string, statues: boolean) => void;
}

const BlogDetails = ({ onBookMark, onEdit }: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { blogId } = useParams<{ blogId: string }>();

  useEffect(() => {
    axios
      .get<Blog[]>("https://688544e1f52d34140f6980f1.mockapi.io/blogs")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const blogWithId = blogs.find((blog) => blog.id === blogId);
  let blogWithoutDescription: Omit<Blog, "description"> | undefined;

  if (blogWithId) {
    const { description, ...rest } = blogWithId;
    blogWithoutDescription = rest;
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        {error && <p className="text-danger">{error}</p>}
        {!error && isLoading && <BeatLoader size={30} color="#8e2de2" />}
      </div>
      {!blogWithoutDescription && !isLoading && !error && (
        <p className="text-danger">Blog not found!</p>
      )}
      {!isLoading && !error && blogWithoutDescription && (
        <div>
          <BlogCard
            blog={blogWithoutDescription}
            onBookMark={onBookMark}
            onEdit={onEdit}
          />
        </div>
      )}
    </>
  );
};

export default BlogDetails;
