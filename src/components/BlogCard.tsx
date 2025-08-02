import { GoDotFill } from "react-icons/go";

interface Props {
  blogId: string;
  blogPhoto: string;
  title: string;
  description: string;
  avatar: string;
  author: string;
  createdAt: string;
}

const BlogCard = ({
  blogPhoto,
  title,
  description,
  avatar,
  author,
  createdAt,
}: Props) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <div>
        <img src={blogPhoto} alt={title} className="img-fluid rounded-4" />
      </div>
      <div className="pt-4">
        <h1 className="fs-4 fw-bolder">
          {title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <p className="fs-6 fw-normal">
          {description.split(" ").slice(0, 30).join(" ")}
        </p>
      </div>
      <div className="d-flex  mt-5 flex-nowrap">
        <img
          src={avatar}
          alt="author profile picture"
          className="rounded-circle align-self-center"
          width={50}
        />
        <span
          className="align-self-center d-inline ms-2 fw-medium mb-0 color-dark text-wrap"
          style={{ fontSize: "1rem" }}
        >
          {author}
        </span>
        <GoDotFill size={30} className="align-self-center " />

        <span
          className="fw-medium align-self-center"
          style={{ fontSize: "1rem" }}
        >
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
