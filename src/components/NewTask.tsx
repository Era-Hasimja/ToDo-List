import { Link } from "react-router-dom";
import { Props } from "../interfaces";

interface Task {
  task: Props;
  remove(removeTask: string): void;
}

export const NewTask = ({ task, remove }: Task) => {
  return (
    <div className="d-flex mt-5 ">
      <div className="mt-2 lb ">
        <span className="label p-3 label-light rounded border text-secondary">
          <Link
            className="bi bi-check-square m-2 text-success"
            to={"done"}
          ></Link>
          <Link
            className="bi bi-arrow-clockwise m-2 text-danger"
            to={"in-progress"}
          ></Link>
          {task.taskName}
        </span>
      </div>
      <div className="btn-toolbar">
        <Link className="btn btn-success" to={"detilas"}>
          Details
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            remove(task.taskName);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
