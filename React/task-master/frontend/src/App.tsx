import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../src/index.css";

// Define custom types
type InputValue = string | number | undefined;

interface Task {
  id:number;
  title: InputValue;
  date: InputValue;
  time: InputValue;
  priority: InputValue;
  status: InputValue;
  uid: InputValue;
}

interface User {
  uid: InputValue;
  name: InputValue;
  email: InputValue;
  password: InputValue;
}

export default function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userID, setUserID] = useState<number | undefined>(undefined);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectTask] = useState<InputValue>();

  // Function to create a new user
  const CreateUser = async (
    name: InputValue,
    email: InputValue,
    password: InputValue
  ) => {
    const newUser: User = {
      uid: undefined,
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        newUser
      );
      const uid = response.data.uid;
      setUser({ ...newUser, uid });
      setUserID(uid);
    } catch (error) {
      console.error("Error creating new user: ", error);
    }
  };

  // Function to handle user login
  const LoginUser = async (email: InputValue, password: InputValue) => {
    try {
      console.log("Logging in with:", { email, password }); // Debugging line

      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      // Debugging line: Check the response data
      console.log("Login response:", response.data);

      const { uid } = response.data;
      if (uid) {
        setUserID(uid);
      } else {
        console.error("Login failed: No UID returned from server.");
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  // Function to create a new task
  const CreateTask = async (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {
    const newTask: Task = {
      id: 0,
      title: title,
      date: date,
      time: time,
      priority: priority,
      status: status,
      uid: userID,
    };

    try {
      await axios.post(`http://localhost:3001/users/${userID}/tasks`, newTask);
      console.log("Task successfully added.");
      fetchTasks(); // Refetch tasks after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to fetch tasks
  const fetchTasks = async () => {
    if (userID !== undefined) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${userID}/tasks`
        );
        if (Array.isArray(response.data)) {
          setTaskList(response.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  // Function to update an existing task
  const UpdatesTask = async (
    id: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {
    if (userID !== undefined && id !== undefined) {
      try {
        // Make the API request to update the task
        await axios.put(`http://localhost:3001/users/${userID}/tasks/${id}`, {
          title,
          date,
          time,
          priority,
          status,
        });
        console.log("Task successfully updated.");

        // Refetch tasks after updating
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };


  // useEffect to track when the task list updates
  useEffect(() => {
    console.log("Task list has been updated:", taskList);
  }, [taskList]);

  // Track the selected task
  const SelectTask = (id: InputValue) => {
    setSelectTask(id);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="tasks"
            element={
              <Tasks
                CreateTask={CreateTask}
                taskList={taskList}
                UpdatesTask={UpdatesTask}
                selectedTask={selectedTask}
                SelectTask={SelectTask}
                userID={userID}
                setTaskList={setTaskList}
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
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error("Root element not found in the document.");
}
