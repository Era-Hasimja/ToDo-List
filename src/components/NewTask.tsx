import { Link } from "react-router-dom";
import { Props } from "../interfaces";

interface Task {
  task: Props;
  handleDeleteTask(taskId: number): void;
  handleTaskCompletion: any;
  handleTaskProgression: any;
}

export const NewTask = ({
  task,
  handleDeleteTask,
  handleTaskCompletion,
  handleTaskProgression,
}: Task) => {
  const taskCompleted = task.isCompleted === "done";
  const taskInProgress = task.inProgress === "in-progress";

  return (
    <div className=" mt-5">
      <div className="mt-2 lb ">
        <span className="label p-3 label-light rounded border text-secondary">
          {!taskCompleted && (
            <Link
              className="bi bi-check-square m-2 text-success"
              onClick={() => handleTaskCompletion(task.id)}
              to="/"
            ></Link>
          )}
          {!taskInProgress && (
            <Link
              className="bi bi-arrow-clockwise m-2 text-danger"
              onClick={() => handleTaskProgression(task.id)}
              to="/"
            ></Link>
          )}
          {task.taskName}
        </span>
      </div>
      <div className="mt-5  btn-toolbar">
        <span className=" label p-3 label-light rounded border text-secondary">
          Description: {task.description}
        </span>
        <span className="label p-3 label-light rounded border text-secondary">
          User: {task.user}
        </span>
      </div>
      <div className="btn-toolbar mt-5">
        <Link className="btn btn-success" to={`/details/${task.id}`}>
          Details
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDeleteTask(task.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
