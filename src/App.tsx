import NavBar from "./components/NavBar.tsx";
import BlogForm from "./components/BlogForm.tsx";
import BlogCard from "./components/BlogCard.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const apiEndPoint = "https://688544e1f52d34140f6980f1.mockapi.io/blogs";

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
}

interface BlogInput {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Blog[]>(apiEndPoint)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addBlog = (data: BlogInput) => {
    const origionalBlog = [...blogs];
    const newBlog = {
      title: data.title,
      author: data.author,
      description: data.description,
      content: data.content,
      tags: data.tags,
    };
    axios
      .post(apiEndPoint, newBlog)
      .then((response) => {
        setBlogs([...blogs, response.data]);
      })
      .catch((error) => {
        setError(error.message), setBlogs(origionalBlog);
      });
  };

  const handleMore = (id: string) => console.log("read more" + id);
  const handleBookMark = (id: string, statues: boolean) =>
    console.log("Bookmark" + id, statues);
  const handleEdit = (id: string) => console.log("edit" + id);

  console.log(blogs);
  return (
    <div>
      <NavBar onNew={() => console.log(blogs)} />
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Blogs</h1>
      </div>
      <div className="d-flex justify-content-center">
        {error && <p className="text-danger">{error}</p>}
        {!error && isLoading && <div className="spinner-border"></div>}
      </div>
      {blogs.length === 0 && !isLoading ? (
        <p className="text-danger">NO BLOGS YET!</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onMore={handleMore}
            onBookMark={handleBookMark}
            onEdit={handleEdit}
          />
        ))
      )}
      <BlogForm onPost={addBlog} />
    </div>
  );
}

export default App;
