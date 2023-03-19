import { useEffect } from "react";
import { Props } from "../interfaces";
import { NewTask } from "./NewTask";

export const InProgress = () => {
  const savedTasksJson = localStorage.getItem("tasks");
  const savedTasks = savedTasksJson ? JSON.parse(savedTasksJson) : null;
  const log = () => {
    console.log("halo", savedTasks);
  };

  useEffect(() => {
    log();
  }, []);

  return (
    <div className="container d-flex mt-5">
      <div>
        <span className="shadow-sm p-3  bg-white text-danger rounded">
          Your tasks are IN PROGRESS. Make sure to work hard for completing the
          tasks in the best way!
        </span>
        <div className="">
          {savedTasks.map((task: any) => (
            <NewTask
              key={task.id}
              task={task}
              remove={function (removeTask: number): void {
                throw new Error("Function not implemented.");
              }}
              updateStatus={function (id: number, newStatus: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
