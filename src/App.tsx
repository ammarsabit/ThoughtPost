import { useState } from "react";
import BlogCard from "./components/BlogCard.tsx";
import "./App.css";
import NavBar from "./components/NavBar.tsx";
import BlogForm from "./components/BlogForm.tsx";

// const blog1 = {
//   id: 1,
//   title: "Understanding React Hooks",
//   author: "Alice",
//   description: "A deep dive into useState and useEffect.",
//   content:
//     "React Hooks are functions that let you use state and other React features without writing a class...",
//   tags: ["react", "dev", "devpost", "learn"],
//   createdAt: "2024-07-01T12:00:00Z",
//   editedAt: "2024-07-02T08:30:00Z",
// };

// const blog2 = {
//   id: 2,
//   title: "Learning Conditional Rendering",
//   author: "Bob",
//   description: "Display content dynamically using ternary and &&.",
//   content:
//     "Conditional rendering in React allows you to show elements based on certain conditions...",
//   tags: ["react", "dev", "devpost", "learn"],
//   createdAt: "2024-07-02T15:45:00Z",
// };

function App() {
  const [blogs, setBlogs] = useState<
    {
      id: number;
      title: string;
      author: string;
      description: string;
      content: string;
      tags: string[];
      createdAt: Date;
      editedAt?: Date;
    }[]
  >([]);

  const handleMore = (id: number) => console.log("read more" + id);
  const handleBookMark = (id: number, statues: boolean) =>
    console.log("Bookmark" + id, statues);
  const handleEdit = (id: number) => console.log("edit" + id);

  const newId =
    blogs.length > 0 ? Math.max(...blogs.map((blog) => blog.id)) + 1 : 0;

  const addBlog = (data: {
    title: string;
    author: string;
    description: string;
    content: string;
    tags: string;
    createdAt: Date;
  }) => {
    const newBlog = [
      ...blogs,
      {
        id: newId,
        title: data.title,
        author: data.author,
        description: data.description,
        content: data.content,
        tags: data.tags.split(" "),
        createdAt: data.createdAt,
      },
    ];
    setBlogs(newBlog);
  };

  return (
    <div>
      <NavBar onNew={() => console.log(blogs)} />

      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Blogs</h1>
      </div>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onMore={handleMore}
          onBookMark={handleBookMark}
          onEdit={handleEdit}
        />
      ))}
      <BlogForm onPost={addBlog} />
    </div>
  );
}

export default App;
