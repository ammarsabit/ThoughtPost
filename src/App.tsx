import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import BookMarks from "./pages/BookMarks";
import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import apiClient from "./services/api-client";
import { atom, useAtom } from "jotai";

export const themeAtom = atom("light");

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

interface CreateInput {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
}

interface EditInput extends CreateInput {
  id: string;
  editedAt: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    apiClient
      .get<Blog[]>("/blogs")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddBlog = (data: CreateInput) => {
    const origionalBlog = [...blogs];
    const newBlog = {
      title: data.title,
      author: data.author,
      description: data.description,
      content: data.content,
      tags: data.tags,
    };
    apiClient
      .post("/blogs", newBlog)
      .then((response) => {
        setBlogs([...blogs, response.data]);
      })
      .catch((error) => {
        setError(error.message), setBlogs(origionalBlog);
      });
  };

  const handleBookMark = (id: string, status: boolean) => {
    const origionalBlogs = [...blogs];
    const blogToUpDate = blogs.find((blog) => blog.id === id);
    if (!blogToUpDate) return;
    const updatedBlog = {
      ...blogToUpDate,
      bookmarked: status,
    };
    setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
    apiClient.put("/blogs/" + id, updatedBlog).catch((error) => {
      setError(error);
      setBlogs(origionalBlogs);
    });
  };

  const handleBlogEdit = (data: EditInput) => {
    const blogToEdit = blogs.find((blog) => blog.id === data.id);
    if (!blogToEdit) return;
    const updatedBlog = {
      ...blogToEdit,
      title: data.title,
      author: data.author,
      description: data.description,
      content: data.content,
      tags: data.tags,
      editedAt: data.editedAt,
    };

    apiClient
      .put("/blogs/" + data.id, updatedBlog)
      .then((response) => {
        setBlogs(
          blogs.map((blog) => (blog.id === data.id ? response.data : blog))
        );
      })
      .catch((error) => {
        setError(error);
      });

    if (!blogToEdit) return;
  };
  const blogsWithoutContent = blogs.map(({ content, ...blog }) => blog);
  const blogsWithoutDescription = blogs.map(({ description, ...blog }) => blog);
  return (
    <div className={`app-container p-3 page-${theme}`}>
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
            />
          }
        />
        <Route
          path="/createBlog"
          element={<CreateBlog onFormSubmit={handleAddBlog} />}
        />
        <Route
          path="/bookmarks"
          element={
            <BookMarks
              blogs={blogsWithoutContent}
              onBookMark={handleBookMark}
            />
          }
        />
        <Route
          path="/editBlog/:blogId"
          element={<EditBlog blogs={blogs} onUpdate={handleBlogEdit} />}
        />
        <Route
          path="/blogDetail/:blogId"
          element={
            <BlogDetails
              blogs={blogsWithoutDescription}
              onBookMark={handleBookMark}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
