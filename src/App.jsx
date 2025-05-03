import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa";
import Popup from "./Popup";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState(false);

  const addTask = () => {
    if (!taskInput.trim()) {
      setError(true);
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleted = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  // Get Tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        } else {
          console.error("Stored tasks are not in the correct format.");
        }
      } catch (error) {
        console.error("Error parsing saved tasks:", error);
        setTasks([]);
      }
    }
  }, []);

  // Set Tasks
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="todo-container rounded-xl shadow-md max-w-[90%] md:max-w-[600px] mx-auto p-5">
      <h1 className="logo text-center text-2xl md:text-3xl pt-4">TO DO LIST</h1>
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-5">
        <input
          type="text"
          placeholder="Enter Your Task"
          onChange={(e) => setTaskInput(e.target.value)}
          value={taskInput}
          className="border border-[#ecefca] rounded-xl p-2 outline-0 text-[#ecefca] flex-1"
        />
        <button
          onClick={addTask}
          className="add px-5 py-2 rounded-xl cursor-pointer bg-[#ecefca]"
        >
          ADD
        </button>
      </div>
      <ul className="mt-5">
        {tasks.map((task, index) => {
          return (
            <div
              key={index}
              className="flex justify-between gap-2 items-center w-full md:w-[320px] mx-auto mt-5"
            >
              <li
                className="flex gap-2 items-center text-[#ecefca] capitalize cursor-pointer text-[16px] md:text-[20px]"
                onClick={() => handleCompleted(task.id)}
              >
                <span>
                  {task.completed ? <FaRegCheckCircle /> : <FaCircleNotch />}
                </span>
                <p className={`${task.completed ? "line-through" : ""}`}>
                  {task.text}
                </p>
              </li>
              <button
                onClick={() => handleDelete(task.id)}
                className="cursor-pointer removeBtn px-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          );
        })}
      </ul>
      {error && <Popup error={error} setError={setError} />}
    </div>
  );
};

export default App;
