import { useAtom } from "jotai";
import { FaTriangleExclamation } from "react-icons/fa6";
import { confirmAtom, deleteTitleAtom, themeAtom } from "../App";

const Confirmation = () => {
  const [theme] = useAtom(themeAtom);
  const [, setSelection] = useAtom(confirmAtom);
  const [deleteTitle] = useAtom(deleteTitleAtom);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 z-3 p-0">
      <div
        className={`card w-10 h-10 p-4 card-${theme}`}
        style={{ width: "350px", zIndex: 999 }}
      >
        <div className="d-flex">
          <FaTriangleExclamation color="orange" size={40} />
          <h2 className="fs-5 px-2 align-self-center">Delete Blog?</h2>
        </div>
        <h3 className="fs-5 py-3">
          This will delete <strong>{deleteTitle}</strong>
        </h3>
        <div className="align-self-end">
          <button
            className="btn btn-outline-success mx-2"
            onClick={() => setSelection("cancel")}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setSelection("delete")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
