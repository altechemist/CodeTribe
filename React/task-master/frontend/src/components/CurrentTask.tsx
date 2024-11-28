import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define types for input values
type InputValue = string | number | undefined;

// Define types for task and props
interface Task {
  taskid: number;
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

  // Function to update task list state
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch tasks from the API when userID changes
  const fetchTasks = useCallback(async () => {
    if (userID === undefined) {
      setError("User ID is undefined");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userID}/tasks`
      );

      if (Array.isArray(response.data)) {
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
        setError("Unexpected data format from the server.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  }, [userID, setTaskList]);

  // Handle task deletion
  const handleDelete = useCallback(
    async (taskId: number) => {
      try {
        await axios.delete(
          `http://localhost:3001/users/${userID}/tasks/${taskId}`
        );

        setTaskList((prevTaskList) =>
          prevTaskList.filter((task) => task.taskid !== taskId)
        );
        console.log("Task deletion successful.");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              `Request failed with status code ${error.response.status}`
            );
          } else if (error.request) {
            setError("Request made but no response received.");
          } else {
            setError("Error setting up request.");
          }
        } else {
          setError("Error during task deletion.");
        }
      }
    },
    [userID, setTaskList]
  );

  // Mark task as completed
  const handleCompletedTask = useCallback((taskId: number) => {
    Swal.fire({
      title: 'Complete!',
      text: 'Task completed successfully',
      icon: 'success',
      confirmButtonText: 'Done'
    })
    if (taskId !== undefined) {
      const selectedTaskDetails = taskList.find((task) => task.id === taskId);

      if (selectedTaskDetails) {
        const { title, date, time, priority } = selectedTaskDetails;
        const status = "Completed";

        UpdatesTask(taskId, title, date, time, priority, status, userID);
      }
    }
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, handleCompletedTask]);

  // Determine background color based on task priority
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

  // Filter tasks based on the search query
  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4 py-md-5">
        Loading...
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

  const incompleteTasks = filteredTasks.filter(
    (task) => task.status !== "Completed"
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
        <div className="list-group gap-2">
          {incompleteTasks.length === 0 ? (
            <div>
              <h3 className="d-flex justify-content-center p-4 py-md-5">
                Add a Task...
              </h3>
            </div>
          ) : (
            <div>
              <div className="text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">
                  Current Tasks
                </h1>

                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control mb-3"
                />
              </div>
              {incompleteTasks.map((task) => {
                const taskId = task.id ?? task.taskid;

                return (
                  <label
                    key={taskId}
                    className="list-group-item d-flex align-items-center mb-2 justify-content-between rounded-4 streak text-light"
                    style={{ backgroundColor: colorPicker(task.priority) }}
                  >
                    <div className="d-flex gap-4">
                      <input
                        onClick={() => handleCompletedTask(taskId)}
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
                        onClick={() => SelectTask(taskId)}
                        className="btn btn-secondary btn-sm outline"
                        data-bs-toggle="modal"
                        data-bs-target="#updateTaskModal"
                      >
                        <i className="bi bi-pencil p-1"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(taskId)}
                        className="btn btn-danger btn-sm outline"
                      >
                        <i className="bi bi-trash p-1"></i>
                      </button>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
