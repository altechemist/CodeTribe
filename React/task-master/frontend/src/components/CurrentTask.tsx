<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Define types for input values
type InputValue = string | number | undefined;

// Define types for task and props
interface Task {
  id: number;
  title: InputValue;
  date: InputValue;
  time: InputValue;
  priority: InputValue;
  status: InputValue;
  uid: InputValue;
}

interface TaskProps {
  userID: number | undefined;
  SelectTask: (id: number) => void;
  taskList: Task[];

  // Updates a task
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;

  // Function to update a task
  UpdatesTask: (
    id: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue,
    uid?: InputValue
  ) => void;

  // Track selected task
  selectedTask: InputValue;
}

const CurrentTask: React.FC<TaskProps> = ({
  userID,
  SelectTask,
  taskList,
  setTaskList,
  UpdatesTask,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the API when userID changes
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      if (userID === undefined) {
        setError("User ID is undefined");
        return;
      }

      const response = await axios.get(
        `http://localhost:3001/users/${userID}/tasks`
      );

      if (Array.isArray(response.data)) {
        // Map the response data to include an 'id' property for each task
        const tasksWithIds: Task[] = response.data.map((task: Task) => ({
          id: task.taskid,
          title: task.title,
          date: task.date,
          time: task.time,
          priority: task.priority,
          status: task.status,
          uid: task.uid,
        }));

        setTaskList(tasksWithIds);
      } else {
        setError("Unexpected data format");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  }, [userID, setTaskList]);

  // Call fetchTasks initially and whenever userID changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, userID, setTaskList]);

  // Handle submission to delete a task
  const handleDelete = useCallback(
    async (taskId: number) => {
      try {
        // Make the API request to delete the task
        await axios.delete(
          `http://localhost:3001/users/${userID}/tasks/${taskId}`
        );

        // Update the task list state to reflect deletion
        setTaskList((prevTaskList) =>
          prevTaskList.filter((task) => task.id !== taskId)
        );
        console.log("Task deletion successful.");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error(
              "Request failed with status code",
              error.response.status
            );
            setError(
              `Request failed with status code ${error.response.status}`
            );
          } else if (error.request) {
            console.error(
              "Request made but no response received",
              error.request
            );
            setError("Request made but no response received");
          } else {
            console.error("Error setting up request", error.message);
            setError("Error setting up request");
          }
        } else {
          console.error("Error during task deletion:", error);
          setError("Error during task deletion");
        }
      }
    },
    [userID, setTaskList]
  );

  // Filter completed tasks
  const incompleteTasks = taskList.filter(
    (task) => task.status !== "Completed"
  );

  // Changes the task status to completed
  const handleCompletedTask = (taskId: number) => {
    if (taskId !== undefined) {
      const selectedTaskDetails = taskList.find((task) => task.id === taskId);

      if (selectedTaskDetails) {
        const { title, date, time, priority } = selectedTaskDetails;
        const status = "Completed";

        UpdatesTask(taskId, title, date, time, priority, status, userID);
      }
    }
  };

  // Determine background color based on task priority
=======
import React, { useState, useEffect } from "react";
import axios from "axios";

// Prop types for the component
type InputValue = string | number | undefined;
interface TaskProps {
  userID: number | undefined;
  SelectTask: (id: InputValue) => void;
}

const CurrentTask: React.FC<TaskProps> = ({ userID, SelectTask }) => {
  const [taskList, setTaskList] = useState<
    {
      title: InputValue;
      date: InputValue;
      time: InputValue;
      priority: InputValue;
      status: InputValue;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/users/${userID}/tasks`);
        setTaskList(response.data);
      } catch (error) {
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchTasks();
    }
  }, [userID]);

  // Change the color based on priority
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  const colorPicker = (priority: InputValue) => {
    switch (priority) {
      case "High":
        return "#dc3545";
      case "Medium":
        return "#ffc107";
      case "Low":
        return "#198754";
      default:
        return "gray";
    }
  };

<<<<<<< HEAD
  // Try to load existing tasks
  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4 py-md-5">
        Loading...
=======
  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4 py-md-5">
        Loading... {userID}
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center p-4 py-md-5">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
        <div className="list-group gap-2">
<<<<<<< HEAD
          {incompleteTasks.length === 0 ? (
            <div>
              <h3 className="d-flex justify-content-center p-4 py-md-5">
                No Current Tasks
              </h3>
            </div>
          ) : (
            <div>
              <div className="text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">
                  Current Tasks
                </h1>
              </div>
              {incompleteTasks.map((task, index) => (
                <label
                  key={index}
                  className="list-group-item d-flex align-items-center justify-content-between rounded-4 streak text-light"
                  style={{ backgroundColor: colorPicker(task.priority) }}
                >
                  <div className="d-flex gap-4">
                    <input
                      onClick={() => handleCompletedTask(task.id)}
                      className="form-check-input flex-shrink-0 outline mt-3"
                      type="checkbox"
                      value=""
                      style={{ fontSize: "1.375em" }}
                    />
                    <span className="pt-1 form-checked-content">
                      <strong className="text-light">{task.title}</strong>
                      <small className="d-block text-body-primary mb-2">
                        <i className="bi bi-alarm me-1"></i>
                        {task.time}, {task.date}
                      </small>
                    </span>
                  </div>
                  <span
                    className="badge outline mx-1"
                    style={{ backgroundColor: colorPicker(task.priority) }}
                  >
                    {task.priority}
                    <br />
                    Priority
                  </span>
                  <div className="btn-group gap-1" role="group">
                    <button
                      onClick={() => SelectTask(task.id)}
                      className="btn btn-secondary btn-sm outline"
                      data-bs-toggle="modal"
                      data-bs-target="#updateTaskModal"
                    >
                      <i className="bi bi-pencil p-1"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn btn-danger btn-sm outline"
                    >
                      <i className="bi bi-trash p-1"></i>
                    </button>
                  </div>
                </label>
              ))}
            </div>
          )}
=======
          {/* Render the task list */}
          <div className="list-group gap-2">
            {taskList.map((task, index) => (
              <label
                key={index}
                className="list-group-item d-flex align-items-center justify-content-between rounded-4 streak text-light"
                style={{ backgroundColor: colorPicker(task.priority) }}
              >
                <div className="d-flex gap-4">
                  <input
                    className="form-check-input flex-shrink-0 outline mt-3"
                    type="checkbox"
                    value=""
                    style={{ fontSize: "1.375em" }}
                  />
                  <span className="pt-1 form-checked-content">
                    <strong className="text-light">{task.title}</strong>
                    <small className="d-block text-body-primary mb-2">
                      <i className="bi bi-alarm me-1"></i>
                      {task.time}, {task.date}
                    </small>
                  </span>
                </div>
                <span
                  className="badge outline mx-1"
                  style={{ backgroundColor: colorPicker(task.priority) }}
                >
                  {task.priority}
                  <br />
                  Priority
                </span>
                <div className="btn-group gap-1" role="group">
                  <button
                    onClick={() => SelectTask(index)}
                    className="btn btn-secondary btn-sm outline"
                    data-bs-toggle="modal"
                    data-bs-target="#updateTaskModal"
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm outline">
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                  <button className="btn btn-success btn-sm outline">
                    <i className="bi bi-check-lg me-1"></i>
                    Done
                  </button>
                </div>
              </label>
            ))}
          </div>
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
