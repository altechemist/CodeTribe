import React from "react";
import CurrentTask from "../components/CurrentTask";
import UpdateTask from "../components/UpdateTask";
import NewTask from "../components/NewTask";
import SearchTask from "../components/SearchTask";

// Prop types for the Task component
type InputValue = string | undefined;
interface TaskProps {
  // Function adds new task
  CreateTask: (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => void;

  // List of available tasks
  taskList: {
    title: InputValue;
    date: InputValue;
    time: InputValue;
    priority: InputValue;
    status: InputValue;
  }[];

  // Track selected task
  selectedTask: InputValue;
  SelectTask: (id: InputValue) => void;

  // Function updates a task
  UpdatesTask: (
    index: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => void;
}

const Task: React.FC<TaskProps> = ({ CreateTask, taskList, UpdatesTask }) => {
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
      <NewTask CreateTask={CreateTask} />

      {/* Component for updating a task */}
      <UpdateTask UpdatesTask={UpdatesTask} />
    </div>
  );
};

export default Task;
