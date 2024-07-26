import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/index.css";

export default function App() {
  type InputValue = string | number | undefined;

  // Define the Task interface
  interface Task {
    title: InputValue;
    date: InputValue;
    time: InputValue;
    priority: InputValue;
    status: InputValue;
    uid: InputValue;
  }

  // Define the User interface
  interface User {
    uid: InputValue;
    name: InputValue;
    email: InputValue;
    password: InputValue;
  }

  // State to hold the user
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userID, setUserID] = useState<number | undefined>(undefined);

  // Function to create a new user
  const CreateUser = async (
    name: InputValue,
    email: InputValue,
    password: InputValue,
    userId?: number
  ) => {
    const newUser: User = {
      uid: userId,
      name: name,
      email: email,
      password: password,
    };

    try {
      // Add a new user
      const response = await axios.post(
        "http://localhost:3001/register",
        newUser
      );

      // Store the uid or use it as needed
      const uid = response.data.uid;
      setUser(newUser);
      alert("uid in createUser: " + uid);
      setUserID(uid);
    } catch (error) {
      console.error("Error creating new user: ", error);
    }
  };

  // Function to handle user login
  const LoginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { uid } = response.data;
      setUserID(uid); // Update userID in the parent component
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  // useEffect to monitor changes in userID
  const navigate = useNavigate();
  useEffect(() => {
    if (userID !== undefined) {
      navigate("/tasks");
    }
  }, [userID, navigate]);

  // State to hold the list of tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Function to create a new task
  const CreateTask = async (
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
      uid: userID,
    };

    // Update local task list
    setTaskList((taskList) => [...taskList, newTask]);

    try {
      await axios.post(`http://localhost:3001/users/${userID}/tasks`, newTask);
      console.log("Task successfully added.");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  // Track the selected task
  const [selectedTask, setSelectTask] = useState<InputValue>();
  const SelectTask = (id: InputValue) => {
    setSelectTask(id);
  };

  // Function to update an existing task
  const UpdatesTask = (
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
              path="tasks"
              element={
                <Task
                  CreateTask={CreateTask}
                  taskList={taskList}
                  UpdatesTask={UpdatesTask}
                  selectedTask={selectedTask}
                  SelectTask={SelectTask}
                  userID={userID}
                />
              }
            />
            <Route
              path="register"
              element={<Register CreateUser={CreateUser} />}
            />
            <Route path="login" element={<Login LoginUser={LoginUser} />} />
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
