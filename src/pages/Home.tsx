import BlogCard from "../components/UserCard.tsx";
import BeatLoader from "react-spinners/BeatLoader";
import Hero from "../components/Hero.tsx";
import Footer from "../components/Footer.tsx";
import { useAtom } from "jotai";
import { themeAtom } from "../App.tsx";
import { useState } from "react";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  description: string;
  blogPhoto: string;
  tags: string;
  createdAt: string;
  editedAt?: string;
  bookmarked: boolean;
}

interface Props {
  blogs: Blog[];
  loading: boolean;
  errorMessage: string;
  onBookMark: (id: string, statues: boolean) => void;
}

const Home = ({ blogs, loading, errorMessage, onBookMark }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [theme] = useAtom(themeAtom);

  const blgs = isExpanded ? blogs : blogs.slice(0, 5);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Hero />
      <div>
        <h1 className="mb-3 mt-5 fs-3 fw-bold">Recent Blog Posts</h1>
        <div className="d-flex justify-content-center">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {!errorMessage && loading && <BeatLoader size={30} color="#8e2de2" />}
        </div>
        {blogs.length === 0 && !loading && !errorMessage ? (
          <p className="text-danger">NO BLOGS YET!</p>
        ) : (
          blgs.map((blog) => (
            <div className={`card blog-card page-${theme} mb-3`}>
              <BlogCard key={blog.id} blog={blog} onBookMark={onBookMark} />
              <p className="ms-3 mb-3">{blog.description}</p>
            </div>
          ))
        )}
        {blogs.length >= 5 && (
          <div className="d-flex justify-content-center my-5">
            <button
              className="btn btn-large btn-dark px-5"
              onClick={() => setExpanded(!isExpanded)}
            >
              Show {isExpanded ? "less" : "more"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
