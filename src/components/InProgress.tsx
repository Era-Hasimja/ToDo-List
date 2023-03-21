import { useEffect, useState } from "react";
import { Props } from "../interfaces";
import { NewTask } from "./NewTask";

const localStorageData = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
};

export const InProgress = () => {
  const savedTasksJson = localStorage.getItem("tasks");
  const savedTasks = savedTasksJson ? JSON.parse(savedTasksJson) : null;
  const newDate = new Date();
  const filteredTasks = savedTasks.filter(
    (task: Props) => task.inProgress === "in-progress"
  );

  const [addTask, setAddTask] = useState<Props[]>(localStorageData);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(addTask));
  }, [addTask]);

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
    <div className="container lb d-flex mt-5">
      <div>
        <span className="shadow-sm p-3  bg-white text-danger rounded">
          Your tasks are IN PROGRESS. Make sure to work hard for completing the
          tasks in the best way!
        </span>
        <div className="">
          {filteredTasks.map((task: Props) => (
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
    </div>
  );
};
