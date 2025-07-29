import { atom, useAtom } from "jotai";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import apiClient from "./services/api-client";
import BlogDetails from "./pages/BlogDetails";
import BookMarks from "./pages/BookMarks";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Confirmation from "./components/Confirmation";

export const themeAtom = atom("dark");
export const confirmAtom = atom("");
export const deleteTitleAtom = atom("");

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
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const [theme] = useAtom(themeAtom);

  // Delete post
  const [selection, setSelection] = useAtom(confirmAtom);
  const [, setDeleteTitle] = useAtom(deleteTitleAtom);
  const [isConfirming, setConfirming] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState("");

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
    const now = Date();
    if (!blogToEdit) return;
    const updatedBlog = {
      ...blogToEdit,
      title: data.title,
      author: data.author,
      description: data.description,
      content: data.content,
      tags: data.tags,
      editedAt: now,
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

  const handleDelete = (id: string) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    if (!blogToDelete) return;

    setDeleteTitle(blogToDelete.title);
    setConfirming(true);
    setBlogIdToDelete(id);
    setSelection("");
  };

  useEffect(() => {
    if (!isConfirming || !blogIdToDelete) return;

    if (selection === "delete") {
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogIdToDelete);
      apiClient
        .delete("/blogs/" + blogIdToDelete)
        .then(() => setBlogs(updatedBlogs))
        .catch((error) => setError(error.message));
    }

    
    setSelection("");
    setBlogIdToDelete("")
    setConfirming(false);
  }, [selection]);

  const blogsWithoutContent = blogs.map(({ content, ...blog }) => blog);
  const blogsWithoutDescription = blogs.map(({ description, ...blog }) => blog);
  return (
    <div className={`app-container p-3 page-${theme}`}>
      {isConfirming && <Confirmation />}
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
              onDelete={handleDelete}
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
              onDelete={handleDelete}
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
              onDelete={handleDelete}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
