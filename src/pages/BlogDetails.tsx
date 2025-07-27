import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

interface Blog {
  id: string;
  avatar: string;
  title: string;
  author: string;
  content: string;
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

const BlogDetails = ({ blogs, onBookMark, onEdit }: Props) => {
  const { blogId } = useParams<{ blogId: string }>();
  const blog = blogs.find((blog) => blog.id === blogId);
  if (!blog) return <p className="text-danger">Blog not found!</p>;
  return (
    <div className="container blog-detail-container">
      <BlogCard blog={blog} onBookMark={onBookMark} onEdit={onEdit} />
    </div>
  );
};

export default BlogDetails;

("React Native icons work fine when developing locally, only to break when you deploy; they just don't load or show up as empty spaces. Every React Native developer has been there. Your icons look perfect during testing, then you create a production build and half of them are missing! This can be very frustrating as a developer working with react native icons. If you’re looking for a solution to this, we'll show you top React Native icon libraries that work reliably in production builds in this guide. These have been tested in real react native apps and proven to be reliable in deployment.");
