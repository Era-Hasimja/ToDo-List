import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewTask } from "../components/NewTask";
import { Props } from "../interfaces";

const initList = {
  task: [],
};

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  return list ? JSON.parse(list) : initList;
};

export const Home = () => {
  const [task, setTask] = useState<string>("");
  const [addTask, setAddTask] = useState<Props[]>([]);
  const [list, setList] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addNewTask = (): void => {
    const newTask = { taskName: task };
    setAddTask([...addTask, newTask]);
    setTask("");

    setList((prev: any) => ({
      ...prev,
      list: [...prev, list],
    }));
  };

  const remove = (removeTask: string): void => {
    setAddTask(
      addTask.filter((task) => {
        return task.taskName != removeTask;
      })
    );
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
            onChange={handleChange}
          />
        </div>
        <div className="text-right">
          <button className="btn mb-3 btn-success" onClick={addNewTask}>
            Create
          </button>
        </div>
      </div>
      <div className="d-flex col-auto btn-toolbar">
        <Link className="btn btn-info" to={"/"}>
          To Do
        </Link>
        <Link className="btn btn-info" to={"in-progress"}>
          In Progress
        </Link>
        <Link className="btn btn-info" to={"done"}>
          Done
        </Link>
      </div>
      <div className="">
        {addTask.map((task: Props, key: number) => {
          return <NewTask key={key} task={task} remove={remove} />;
        })}
      </div>
    </div>
  );
};
