import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NewTask } from "../components/NewTask";
import { Props } from "../interfaces";

const localStorageData = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
};
export const Home = () => {
  const [addTask, setAddTask] = useState<Props[]>(localStorageData);
  const [task, setTask] = useState<string>("");

  const filteredTasks = addTask.filter(
    (task: Props) =>
      task.inProgress != "in-progress" && task.isCompleted != "done"
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(addTask));
  }, [addTask]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const handleCreateTask = () => {
    if (task !== "") {
      setAddTask([
        ...addTask,
        {
          id: addTask.length + 1,
          taskName: task.trim(),
          isCompleted: "",
          inProgress: "",
          // dateAndTime: new Date(),
          description: "",
          user: "",
        },
      ]);
    }
    setTask("");
  };

  const handleDeleteTask = (id: number) => {
    const removeItem = addTask.filter((task) => {
      return task.id !== id;
    });
    setAddTask(removeItem);
  };

  const handleTaskCompletion = (id: number) => {
    const updatedTasks = addTask.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: "done" };
      } else {
        return task;
      }
    });
    setAddTask(updatedTasks);
  };

  const handleTaskProgression = (id: number) => {
    const updatedTasks = addTask.map((task) => {
      if (task.id === id) {
        return { ...task, inProgress: "in-progress", dateAndTime: new Date() };
      } else {
        return task;
      }
    });
    setAddTask(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <div className="col">
        <div className="form-group">
          <input
            type="text"
            value={task}
            className="form-control"
            placeholder="Write your task here..."
            aria-label="Write your task here..."
            aria-describedby="basic-addon2"
            onChange={handleInputChange}
          />
        </div>
        <div className="text-right">
          <button className="btn mb-3 btn-success" onClick={handleCreateTask}>
            Create
          </button>
        </div>
      </div>
      <div className="d-flex col-auto btn-toolbar">
        <Link className="btn btn-info" to={"/"}>
          To Do
        </Link>
        <Link className="btn btn-info" to={"/in-progress"}>
          In Progress
        </Link>
        <Link className="btn btn-info" to={"/done"}>
          Done
        </Link>
        <Link className="btn btn-info " to={"/users"}>
          View Users
        </Link>
      </div>
      <div className="">
        {filteredTasks.map((task: any) => (
          <NewTask
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleTaskCompletion={handleTaskCompletion}
            handleTaskProgression={handleTaskProgression}
          />
        ))}
      </div>
    </div>
  );
};
