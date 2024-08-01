import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
<<<<<<< HEAD
import Tasks from "./pages/Task";
=======
import Home from "./pages/Home";
import Task from "./pages/Task";
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
<<<<<<< HEAD
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../src/index.css";

// Define custom types
type InputValue = string | number | undefined;

interface Task {
  id: number;
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
=======
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
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038

  // Function to create a new user
  const CreateUser = async (
    name: InputValue,
    email: InputValue,
<<<<<<< HEAD
    password: InputValue
  ): Promise<boolean> => {
    const newUser: User = {
      uid: undefined,
=======
    password: InputValue,
    userId?: number
  ) => {
    const newUser: User = {
      uid: userId,
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      name: name,
      email: email,
      password: password,
    };

    try {
<<<<<<< HEAD
=======
      // Add a new user
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      const response = await axios.post(
        "http://localhost:3001/register",
        newUser
      );
<<<<<<< HEAD
      const uid = response.data.uid;
      setUser({ ...newUser, uid });
      setUserID(uid);
      return true;
    } catch (error) {
      console.error("Error creating new user: ", error);
      return false;
    }
    return false;
  };

  // Function to handle user login
  const LoginUser = async (
    email: InputValue,
    password: InputValue
  ): Promise<boolean> => {
    try {
      console.log("Logging in with:", { email, password });

=======

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
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
<<<<<<< HEAD

      console.log("Login response:", response.data);

      // Track current user
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
        console.error("Login error response:", error.response?.data);
        console.error("Login error message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      // Indicate failure
      return false;
    }
  };

=======
      const { uid } = response.data;
      setUserID(uid); // Update userID in the parent component
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  // useEffect to monitor changes in userID
  useEffect(() => {
    if (userID !== undefined) {
      // Handle side effects or update logic here when userID changes
      console.log("userID has been updated to: ", userID);

      // Redirect to tasks page if userID is set
      window.location.href = "/tasks";
    }
  }, [userID]);

  // State to hold the list of tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  // Function to create a new task
  const CreateTask = async (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {
    const newTask: Task = {
<<<<<<< HEAD
      id: 0,
=======
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      title: title,
      date: date,
      time: time,
      priority: priority,
      status: status,
      uid: userID,
    };

<<<<<<< HEAD
    try {
      await axios.post(`http://localhost:3001/users/${userID}/tasks`, newTask);

      // Refetch tasks after adding
      fetchTasks();

=======
    // Update local task list
    setTaskList((taskList) => [...taskList, newTask]);

    try {
      await axios.post(`http://localhost:3001/users/${userID}/tasks`, newTask);
      console.log("Task successfully added.");
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
<<<<<<< HEAD

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
=======
  // Track the selected task
  const [selectedTask, setSelectTask] = useState<InputValue>();
  const SelectTask = (id: InputValue) => {
    setSelectTask(id);
  };

  // Function to update an existing task
  const UpdatesTask = (
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error("Root element not found in the document.");
}
