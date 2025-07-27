import BlogCard from "../components/BlogCard";

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
  onEdit: (id: string) => void;
  onBookMark: (id: string, statues: boolean) => void;
}

const BookMarks = ({ blogs, onEdit, onBookMark }: Props) => {
  return (
    <>
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">Bookmarked</h1>
      </div>

      {blogs
        .filter((blog) => blog.bookmarked)
        .map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onBookMark={onBookMark}
            onEdit={onEdit}
          />
        ))}
    </>
  );
};

export default BookMarks;
