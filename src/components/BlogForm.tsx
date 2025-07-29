import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { themeAtom } from "../App";

interface BlogData {
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string;
  editedAt?: string;
}

interface Props {
  edit?: BlogData;
  formSubmit: (data: BlogData) => void;
}

const BlogForm = ({ edit, formSubmit }: Props) => {
  const [submited, setSubmited] = useState(false);
  const [theme] = useAtom(themeAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogData>();

  const onSubmit = (data: BlogData) => {
    formSubmit(data);
    setSubmited(true);
  };
  return (
    <>
      <div className=" gradient-text">
        {edit ? (
          <p className="text-center mb-3 fs-1 fw-bold">
            Refine Your <br /> Thought
          </p>
        ) : (
          <h1 className="text-center mb-3 fs-1 fw-bold">
            Through Your
            <br /> Thought
          </h1>
        )}
      </div>
      {submited && (
        <div>
          <p className="text-center text-success">
            🎉 The post is successfully made get back to the home page to see
            your blog
          </p>
        </div>
      )}
      {!submited && (
        <div className="d-flex justify-content-center form-card">
          <form
            className={`card page-${theme}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="card-body d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  {...register("author", { required: true })}
                  id="author"
                  type="text"
                  className={`form-control page-${theme}`}
                  placeholder="John Smith"
                  defaultValue={edit ? edit.author : ""}
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
                  className={`form-control page-${theme}`}
                  defaultValue={edit ? edit.title : ""}
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
                  className={`form-control page-${theme}`}
                  defaultValue={edit ? edit.description : ""}
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
                  className={`form-control page-${theme}`}
                  placeholder="Example: react dev design"
                  defaultValue={edit ? edit.tags : ""}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  {...register("content", { required: true })}
                  id="content"
                  className={`form-control page-${theme}`}
                  defaultValue={edit ? edit.content : ""}
                />
                {errors.description?.type === "required" && (
                  <p className="text-danger">Content is required</p>
                )}
              </div>
              <button className="btn btn-lg btn-native align-self-end">{edit ? "Save" : "Post"}</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BlogForm;
