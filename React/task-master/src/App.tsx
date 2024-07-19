import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/index.css";

export default function App() {
  // Define the Task interface
  type InputValue = string | number | undefined;
  interface Task {
    title: InputValue;
    date: InputValue;
    time: InputValue;
    priority: InputValue;
    status: InputValue;
  }

  // State to hold the list of tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Function to create a new task
  const CreateTask = (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {
    const newTask: Task = {
      title: title,
      date: date,
      time: time,
      priority: priority,
      status: status,
    };
    setTaskList((taskList) => [...taskList, newTask]);
  };

 
  // Track the selected task
  const [selectedTask, setSelectTask] = useState<InputValue>();
  const SelectTask = (id: InputValue) => {
    setSelectTask(id)
  };

  // Function to update an existing task
  const UpdatesTask = (
    id: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {

    // Temporarily store task information
    const tmpTask: Task = {
      title: title,
      date: date,
      time: time,
      priority: priority,
      status: status,
    };

    // Find the index of the selected task
    const index = taskList.findIndex(function (task) {
      return task.title === title;
    });

    // Update values
    taskList[index] = tmpTask;
    setTaskList((taskList) => [...taskList]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="task"
              element={<Task CreateTask={CreateTask}  taskList={taskList} UpdatesTask={UpdatesTask} selectedTask={selectedTask} SelectTask={SelectTask} />}
            />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error("Root element not found in the document.");
}
