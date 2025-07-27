import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import BookMarks from "./pages/BookMarks";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

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
  bookmarked: boolean;
}

interface BlogInput {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
}

const apiEndPoint = "https://688544e1f52d34140f6980f1.mockapi.io/blogs";

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const handleBookMark = (id: string, status: boolean) => {
    const origionalBlogs = [...blogs];
    const blogToUpDate = blogs.find((blog) => blog.id === id);
    if (!blogToUpDate) return;
    const updatedBlog = {
      ...blogToUpDate,
      bookmarked: status,
    };
    setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
    axios.put(apiEndPoint + "/" + id, updatedBlog).catch((error) => {
      setError(error);
      setBlogs(origionalBlogs);
    });
  };

  const handleEdit = (id: string) => console.log("edit" + id);

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

  const blogsWithoutContent = blogs.map(({ content, ...blog }) => blog);
  const blogsWithoutDescription = blogs.map(({ description, ...blog }) => blog);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogsWithoutContent}
              loading={isLoading}
              errorMessage={error}
              onBookMark={handleBookMark}
              onEdit={handleEdit}
            />
          }
        />
        <Route path="/createBlog" element={<CreateBlog onPost={addBlog} />} />
        <Route
          path="/bookmarks"
          element={
            <BookMarks
              blogs={blogsWithoutContent}
              onBookMark={handleBookMark}
              onEdit={handleEdit}
            />
          }
        />
        <Route path="/editBlog" element={<EditBlog />} />
        <Route
          path="/blogDetail/:blogId"
          element={
            <BlogDetails blogs={blogsWithoutDescription} onBookMark={handleBookMark} onEdit={handleEdit} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
