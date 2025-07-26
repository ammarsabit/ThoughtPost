import { useState } from "react";
import { useForm } from "react-hook-form";

interface BlogData {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
  createdAt: Date;
}

interface Props {
  onPost: (data: BlogData) => void;
}

const BlogForm = ({ onPost }: Props) => {
  const [success, setSucces] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogData>();

  const onSubmit = (data: BlogData) => {
    const now = new Date();
    onPost({...data, createdAt: now});
    reset();
    setSucces(true);
  };
  return (
    <>
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">
          Through Your
          <br /> Thought
        </h1>
      </div>
      {success && (
        <p className="text-center text-success">
          🎉 The post is successfully made get back to the home page to see your
          blog
        </p>
      )}
      <div className="d-flex justify-content-center">
        <form className="card" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body d-flex flex-column">
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                {...register("author", { required: true })}
                id="author"
                type="text"
                className="form-control"
                placeholder="John Smith"
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">Author is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                id="title"
                type="text"
                className="form-control"
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">Title is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Short Description
              </label>
              <input
                {...register("description", { required: true })}
                id="description"
                type="text"
                className="form-control"
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">Description is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (space separated)
              </label>
              <input
                {...register("tags")}
                id="tags"
                type="text"
                className="form-control"
                placeholder="react dev design "
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                {...register("content", { required: true })}
                id="content"
                className="form-control"
                placeholder=""
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">Content is required</p>
              )}
            </div>
            <button className="btn btn-lg align-self-end">Post</button>
          </div>
        </form>
      </div>
      
    </>
  );
};

export default BlogForm;
