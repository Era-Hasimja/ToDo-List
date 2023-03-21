import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Props } from "../interfaces";

interface User {
  id: number;
  name: string;
}

const localStorageData = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
};

export const Details = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Props[]>(localStorageData);
  const [users, setUsers] = useState<User[]>([]);
  const [description, setDescription] = useState("");

  const getInitialState = () => {
    const value = "Luke Skywalker";
    return value;
  };

  const savedTasks = localStorage.getItem("tasks");

  const [selectedUser, setSelectedUser] = useState(getInitialState);
  const params = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://swapi.dev/api/people/");
      const jsonData = await response.json();
      setUsers(jsonData.results);
    };
    fetchData();
    console.log;
  }, []);

  const updateTask = (id: number, description: string, user: string) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        const data = JSON.parse(localStorage.tasks);
        for (var i = 0; i < data.length; i++) {
          if (task.id === data[i].id) {
            data[i].description = description;
            data[i].user = user;
            break;
          }
        }
        localStorage.setItem("tasks", JSON.stringify(data));
      }
    });
    navigate("/");
  };

  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="container form-group mt-5">
      <div>
        <label htmlFor="comment">Describe your task:</label>
        <textarea
          onChange={handleTextAreaChange}
          className="form-control"
          rows={5}
          id="comment"
        ></textarea>
      </div>
      <select
        className="form-select form-select-lg mb-3 mt-5"
        aria-label=".form-select-lg example"
        value={selectedUser}
        onChange={handleSelectChange}
      >
        {users.map((user, index) => (
          <option id="selected" value={user.id} key={index}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => updateTask(Number(params), description, selectedUser)}
        type="submit"
        className="btn mt-3 btn-primary"
      >
        Save
      </button>
    </div>
  );
};
