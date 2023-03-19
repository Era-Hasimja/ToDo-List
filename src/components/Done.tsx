import { useEffect, useState } from "react";

export const Done = () => {
  // const [update, setUpdate] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(update));
  // }, [update]);

  return (
    <div className="container d-flex mt-5">
      <div>
        <span className="shadow-sm p-3  bg-white text-danger rounded">
          Your tasks are DONE. Congratulations that you have successfully
          completed your tasks!
        </span>
      </div>
    </div>
  );
};
