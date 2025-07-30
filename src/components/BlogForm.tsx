import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { themeAtom } from "../App";
import axios from "axios";

interface BlogData {
  title: string;
  author: string;
  description: string;
  content: string;
  blogPhoto: string;
  tags: string;
  editedAt?: string;
}

interface Props {
  edit?: BlogData;
  formSubmit: (data: BlogData) => void;
}

const BlogForm = ({ edit, formSubmit }: Props) => {
  const [submited, setSubmited] = useState(false);
  const [image, setImage] = useState<FormData | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [theme] = useAtom(themeAtom);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageData = new FormData();
    imageData.append("image", file);
    setImage(imageData);
  };

  useEffect(() => {
    if (!image) return;
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=82bca9b4b1e6512f2421267af231717d`,
        image
      )
      .then((response) => {
        setImageUrl(response.data.data.url);
      })
      .catch((error) => setError(error.message));
  }, [image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogData>();

  const onSubmit = (data: BlogData) => {
    if (image && !imageUrl) {
      setError("Image is still uploading. Please wait.");
      return;
    }

    formSubmit({ ...data, blogPhoto: imageUrl });
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
      {error && <p className="text-danger">Image upload failed {error}</p>}
      {image && !imageUrl && <p className="text-danger">Uploading image</p>}
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
                <label htmlFor="blogPhoto" className="form-label">
                  Blog Photo
                </label>
                <input
                  {...register("blogPhoto", { required: true })}
                  id="blogPhoto"
                  type="file"
                  className={`form-control page-${theme}`}
                  defaultValue={edit ? edit.description : ""}
                  onChange={handleImageUpload}
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
              <button
                className="btn btn-lg btn-native align-self-end"
                disabled={!imageUrl}
              >
                {edit ? "Save" : "Post"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BlogForm;
