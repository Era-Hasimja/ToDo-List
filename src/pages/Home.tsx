import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewTask } from "../components/NewTask";
import { Props } from "../interfaces";

export const Home = () => {
  const [addTask, setAddTask] = useState(() => {
    // const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedTasksJson = localStorage.getItem("tasks");
    const savedTasks = savedTasksJson ? JSON.parse(savedTasksJson) : null;

    console.log(savedTasks);
    let done_tasks = [];
    let todo_tasks = [];
    let inprogress_tasks = [];
    if (savedTasks) {
      for (let i = 0; i < savedTasks.length; i++) {
        // console.log(savedTasks[i].status);
        switch (savedTasks[i].status) {
          case "to-do":
            todo_tasks.push(savedTasks[i]);
            break;
          case "done":
            done_tasks.push(savedTasks[i]);
            break;
          case "in-progress":
            inprogress_tasks.push(savedTasks[i]);
            break;
        }
      }
    }

    console.log("done tasks -->>>", done_tasks);
    console.log("todo-tasks ->>", todo_tasks);
    console.log("inprogress-tasks ->>", inprogress_tasks);

    if (savedTasks) {
      return savedTasks;
    } else {
      return [];
    }
  });

  const [task, setTask] = useState<string>("");

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
          status: "to-do",
        },
      ]);
    }
    setTask("");
  };

  const handleDeleteTask = (id: number) => {
    const removeItem = addTask.filter((task: any) => {
      return task.id !== id;
    });
    setAddTask(removeItem);
  };

  const updateStatus = (id: number, newStatus: string) => {
    const update = addTask.map((task: any) => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    setAddTask(update);
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
        <Link className="btn btn-info" to={"in-progress"}>
          In Progress
        </Link>
        <Link className="btn btn-info" to={"done"}>
          Done
        </Link>
        <Link className="btn btn-info " to={"users"}>
          View Users
        </Link>
      </div>
      <div className="">
        {addTask.map((task: any) => (
          <NewTask
            key={task.id}
            task={task}
            remove={handleDeleteTask}
            updateStatus={updateStatus}
          />
        ))}
      </div>
    </div>
  );
};

//duhet mi lidh tash me faqet done edhe in-progress
