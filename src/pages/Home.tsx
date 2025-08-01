import BlogCard from "../components/BlogCard.tsx";
import BeatLoader from "react-spinners/BeatLoader";
import Hero from "../components/Hero.tsx";
import Footer from "../components/Footer.tsx";
import { useAtom } from "jotai";
import { themeAtom } from "../App.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";

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
}

const Home = ({ blogs, loading, errorMessage }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [theme] = useAtom(themeAtom);

  const blgs = isExpanded ? blogs : blogs.slice(0, 9);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Hero />
      <div>
        
        <div className="blogs-container">
          <h1 className="mb-4 mt-5 fs-3 fw-bold">Recent Blog Posts</h1>
          <div className="d-flex justify-content-center">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {!errorMessage && loading && <BeatLoader size={30} />}
        </div>
          <div className="grid-container">
            {blogs.length === 0 && !loading && !errorMessage ? (
              <p className="text-danger">NO BLOGS YET!</p>
            ) : (
              blgs.map((blog) => (
                <Link
                  to={"/blogDetail/" + blog.id}
                  className="text-decoration-none"
                >
                  <div className={`blog-card page-${theme} mb-3`}>
                    <BlogCard
                      blogId={blog.id}
                      blogPhoto={blog.blogPhoto}
                      title={blog.title}
                      description={blog.description}
                      avatar={blog.avatar}
                      author={blog.author}
                      createdAt={blog.createdAt}
                    />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
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
