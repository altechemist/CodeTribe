import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Tasks from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import React, { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/index.css";

import Swal from "sweetalert2";

// Define custom types
type InputValue = string | number | undefined;

interface Task {
  taskid: number; // Updated to use taskid
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
  ): Promise<boolean> => {
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
      return true;
    } catch (error) {
      console.error("Error creating new user: ", error);
      return false;
    }
  };

  // Function to handle user login
  const LoginUser = async (
    email: InputValue,
    password: InputValue
  ): Promise<boolean> => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const { uid } = response.data;
      if (uid) {
        setUserID(uid);
        return true;
      } else {
        console.error("Login failed: No UID returned from server.");
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login error message:", error?.message);
        Swal.fire({
          title: "Error!",
          text: error?.message,
          icon: "error",
          confirmButtonText: "Retry",
          primaryButtonColor: "#0D6EFD",
        });
      } else {
        console.error("Unexpected error:", error?.message);
      }
      return false;
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
    const newTask = {
      title: title,
      date: date,
      time: time,
      priority: priority,
      status: status,
      uid: userID,
    };

    try {
      // Post the new task and expect the response to contain the new task data with taskid
      const response = await axios.post(
        `http://localhost:3001/users/${userID}/tasks`,
        newTask
      );

      // const createdTask = response.data;
      // Update the task list state with the new task
      // setTaskList((prevTaskList) => [...prevTaskList, createdTask]);

      fetchTasks();
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
          console.log("Fetched tasks:", response.data);
          setTaskList(response.data);
        } else {
          console.error("Unexpected data format from server");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  // Function to update an existing task
  const UpdatesTask = async (
    taskid: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {
    if (userID !== undefined && taskid !== undefined) {
      try {
        // Make the API request to update the task
        await axios.put(
          `http://localhost:3001/users/${userID}/tasks/${taskid}`,
          {
            title,
            date,
            time,
            priority,
            status,
          }
        );
        console.log("Task successfully updated.");

        // Refetch tasks after updating
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Track the selected task
  const SelectTask = (id: InputValue) => {
    setSelectTask(id);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
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
