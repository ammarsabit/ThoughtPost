import BlogCard from "../components/BlogCard.tsx";
import BeatLoader from "react-spinners/BeatLoader";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  description: string;
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

const Home = ({
  blogs,
  loading,
  errorMessage,
  onBookMark,
}: Props) => {
  return (
    <>
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Blogs</h1>
      </div>
      <div className="d-flex justify-content-center">
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {!errorMessage && loading && <BeatLoader size={30} color="#8e2de2" />}
      </div>
      {blogs.length === 0 && !loading && !errorMessage ? (
        <p className="text-danger">NO BLOGS YET!</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onBookMark={onBookMark}
          />
        ))
      )}
    </>
  );
};

export default Home;
