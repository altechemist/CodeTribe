import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CompletedTask: React.FC<TaskProps> = ({
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
        const tasksWithIds: Task[] = response.data.map((task: any) => ({
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
  }, [fetchTasks, userID]);

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
  const completedTasks = useMemo(
    () => taskList.filter((task) => task.status === "Completed"),
    [taskList]
  );

  // Determine background color based on task priority
  const colorPicker = useCallback((priority: InputValue) => {
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
  }, []);

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

  // Mark task as completed
  const handleCompletedTask = (taskId: number) => {
    Swal.fire({
      title: 'Incomplete Task!',
      text: 'Do you want to continue',
      icon: 'info',
      confirmButtonText: 'Continue',
      confirmButtonColor: '#0D6EFD'
    })
    if (taskId !== undefined) {
      const selectedTaskDetails = taskList.find((task) => task.id === taskId);

      if (selectedTaskDetails) {
        const { title, date, time, priority } = selectedTaskDetails;
        const status = "Incomplete";

        UpdatesTask(taskId, title, date, time, priority, status, userID);
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center">
      <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
        <div className="list-group gap-2">
          {completedTasks.length === 0 ? (
            <div>
              <h3 className="d-flex justify-content-center p-4 py-md-5">
                No Completed Tasks
              </h3>
            </div>
          ) : (
            <div>
              <div className="text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">
                  Completed Tasks
                </h1>
              </div>
              {completedTasks.map((task) => {
                // Choose the id to use, preferring task.id over task.taskid
                const taskId = task.id ?? task.taskid;

                return (
                  <label
                    key={taskId}
                    className="list-group-item d-flex align-items-center mb-2  justify-content-between rounded-4 streak text-light"
                    style={{ backgroundColor: colorPicker(task.priority) }}
                  >
                    <div className="d-flex gap-4">
                      <input
                        onClick={() => handleCompletedTask(taskId)}
                        className="form-check-input flex-shrink-0 outline mt-3"
                        type="checkbox"
                        checked={task.status === "Completed" ? true : false}
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

export default CompletedTask;
