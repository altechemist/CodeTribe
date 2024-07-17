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
  interface Task {
    title: string;
    date: string;
    time: string;
    priority: string;
  }

  // State to hold the list of tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Function to create a new task
  const CreateTask = () => {
    const newTask: Task = {
      title: "Project",
      date: "yyyy/mm/dd",
      time: "10:42",
      priority: "High Priority"
    };
    setTaskList((taskList) => [...taskList, newTask]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Pass CreateTask as a prop to Task component */}
            <Route path="task" element={<Task CreateTask={CreateTask} taskList={taskList} />} />
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
