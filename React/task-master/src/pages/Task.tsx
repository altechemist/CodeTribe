import React from "react";
import CurrentTask from "../components/CurrentTask";
import NewTask from "../components/NewTask";
import SearchTask from "../components/SearchTask";
import UpdateTask from "../components/UpdateTask";

// Define prop types for the Task component
interface TaskProps {
  CreateTask: () => void;
  taskList: {
    title: string;
    date: string;
    time: string;
    priority: string;
  }[];
}

const Task: React.FC<TaskProps> = ({ CreateTask, taskList }) => {
  // Function to handle creating a task
  const handleCreateTask = () => {
    CreateTask();
  };

  return (
    <div className="container-sm">
      {/* Section for current tasks */}
      <div className="current-tasks">
        <div className="text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Current Tasks
          </h1>
        </div>

        {/* Search Task component */}
        <SearchTask />

        {/* Current Task component */}
        <CurrentTask taskList={taskList} />
      </div>

      {/* Component for adding a new task */}
      <NewTask />

      {/* Component for updating a task */}
      <UpdateTask />

      {/* Button to test CreateTask function */}
      <button onClick={handleCreateTask} className="btn btn-primary mt-3">
        Create Task
      </button>

      {/* Display current tasks */}
      <div>
        <h2>Current Task List:</h2>
        <ul>
          {taskList.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong> - {task.date}, {task.time},{" "}
              {task.priority}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
