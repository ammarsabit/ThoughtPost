import { atom, useAtom } from "jotai";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./pages/About";
import apiClient from "./services/api-client";
import BlogDetails from "./pages/BlogDetails";
import BookMarks from "./pages/BookMarks";
import ConfirmDelete from "./components/ConfirmDelete";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import "./App.css";
import axios from "axios";
import BlogForm, { formActionAtom } from "./components/BlogForm";

export const themeAtom = atom("light");
export const confirmAtom = atom("");
export const deleteTitleAtom = atom("");

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  occupation: string;
  description: string;
  blogPhoto: string;
  content: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean;
}

interface FormData {
  blogId: string;
  title: string;
  author: string;
  Occupation: string;
  description: string;
  content: string;
  PhotoData: FileList;
  tags: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const [theme] = useAtom(themeAtom);
  const [formAction, setFormAction] = useAtom(formActionAtom);

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

  const handleAddBlog = (data: FormData) => {
    const origionalBlog = [...blogs];
    const imageFile = data.PhotoData?.[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=82bca9b4b1e6512f2421267af231717d`,
        imageData
      )
      .then((response) => {
        const newBlog = {
          title: data.title,
          author: data.author,
          description: data.description,
          content: data.content,
          tags: data.tags,
          blogPhoto: response.data.data.url,
        };
        apiClient
          .post("/blogs", newBlog)
          .then((response) => {
            setBlogs([...blogs, response.data]);
          })
          .catch((error) => {
            setError(error.message), setBlogs(origionalBlog);
          });
      })
      .catch((error) => setError(error.message));
  };

  const handleBlogEdit = (data: FormData) => {
    const blogToEdit = blogs.find((blog) => blog.id === data.blogId);
    if (!blogToEdit) return;

    const now = Date();
    const imageFile = data.PhotoData?.[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=82bca9b4b1e6512f2421267af231717d`,
        imageData
      )
      .then((response) => {
        const updatedBlog = {
          ...blogToEdit,
          title: data.title,
          author: data.author,
          occupation: data.Occupation,
          description: data.description,
          content: data.content,
          tags: data.tags,
          blogPhoto: response.data.data.url,
          editedAt: now,
        };

        apiClient
          .put("/blogs/" + data.blogId, updatedBlog)
          .then((response) => {
            setBlogs(
              blogs.map((blog) =>
                blog.id === data.blogId ? response.data : blog
              )
            );
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => setError(error.message));
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
    setBlogIdToDelete("");
    setConfirming(false);
  }, [selection]);

  return (
    <div
      className={`app-container position-relative pb-4 pt-2 px-4 page-${theme}`}
    >
      {isConfirming && <ConfirmDelete />}
      {formAction && <BlogForm formSubmit={handleAddBlog} />}
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home blogs={blogs} loading={isLoading} errorMessage={error} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/bookmarks"
          element={<BookMarks blogs={blogs} onBookMark={handleBookMark} />}
        />
        <Route
          path="/blogDetail/:blogId"
          element={
            <BlogDetails
              blogs={blogs}
              errorMessage={error}
              onBookMark={handleBookMark}
              onDelete={handleDelete}
              onUpdate={handleBlogEdit}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
