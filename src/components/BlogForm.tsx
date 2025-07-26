import React from "react";

const BlogForm = () => {
  return (
    <>
      <div className=" gradient-text">
        <h1 className="text-center mb-3 fs-1 fw-bold">
          Through Your
          <br /> Thought
        </h1>
      </div>
      <div className="d-flex justify-content-center">
        <form className="card">
          <div className="card-body d-flex flex-column">
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                id="author"
                type="text"
                className="form-control"
                placeholder="John Smith"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input id="title" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Short Description
              </label>
              <input id="description" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (space separated)
              </label>
              <input
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
              <textarea id="content" className="form-control" placeholder="" />
            </div>
            <button className="btn btn-lg align-self-end">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;


