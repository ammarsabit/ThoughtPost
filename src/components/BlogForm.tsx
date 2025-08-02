import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { themeAtom } from "../App";

export const formActionAtom = atom(false);

interface ToEdit {
  blogId: string;
  title: string;
  author: string;
  occupation: string;
  description: string;
  content: string;
  tags: string;
}

interface FormData extends ToEdit {
  photoData: FileList;
}

interface Props {
  edit?: ToEdit;
  formSubmit: (data: FormData) => void;
}

const BlogForm = ({ edit, formSubmit }: Props) => {
  const [theme] = useAtom(themeAtom);

  const [, setFormAction] = useAtom(formActionAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    edit ? formSubmit({ ...data, blogId: edit.blogId }) : formSubmit(data);
    setFormAction(false);
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 z-3 p-0">
      <div className={`card card-form rounded-4 page-${theme}`}>
        <div className="card-body">
          <span>
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
          </span>
          <span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between">
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <input
                    {...register("author", { required: true })}
                    id="author"
                    type="text"
                    className={`form-control page-${theme}`}
                    placeholder="Full Name"
                    defaultValue={edit ? edit.author : ""}
                  />
                  {errors.description?.type === "required" && (
                    <p className="text-danger">Author is required</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="occupation" className="form-label">
                    Occupation
                  </label>
                  <input
                    {...register("occupation", { required: true })}
                    id="Occupation"
                    type="text"
                    className={`form-control page-${theme}`}
                    placeholder="Pen-Tester"
                    defaultValue={edit ? edit.occupation : ""}
                  />
                  {errors.description?.type === "required" && (
                    <p className="text-danger">Occupation is required</p>
                  )}
                </div>
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
                  placeholder="Title"
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
                  placeholder="Description"
                  className={`form-control page-${theme}`}
                  defaultValue={edit ? edit.description : ""}
                />
                {errors.description?.type === "required" && (
                  <p className="text-danger">Description is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="PhotoData" className="form-label">
                  Blog Photo
                </label>
                <input
                  {...register("photoData", { required: true })}
                  id="PhotoData"
                  type="file"
                  className={`form-control page-${theme}`}
                />
                {errors.photoData?.type === "required" && (
                  <p className="text-danger">Blog Photo is required</p>
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
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-danger px-4"
                  type="button"
                  onClick={() => setFormAction(false)}
                >
                  cancel
                </button>
                <button className="btn btn-lg btn-dark px-4" type="submit">
                  {edit ? "Save" : "Post"}
                </button>
              </div>
            </form>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
