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

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4 py-md-5">
        Loading... {userID}
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
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
