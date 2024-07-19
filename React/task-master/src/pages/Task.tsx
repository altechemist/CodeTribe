import React from "react";
import CurrentTask from "../components/CurrentTask";
import UpdateTask from "../components/UpdateTask";
import NewTask from "../components/NewTask";
import SearchTask from "../components/SearchTask";

// Prop types for the Task component
type InputValue = string | number | undefined;
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

const Task: React.FC<TaskProps> = ({
  CreateTask,
  taskList,
  UpdatesTask,
  selectedTask,
  SelectTask,
}) => {
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
        <CurrentTask taskList={taskList} SelectTask={SelectTask} />
      </div>

      {/* Creates a new task */}
      <button
        type="button"
        className="btn btn-primary floating"
        data-bs-toggle="modal"
        data-bs-target="#addTaskModal"
      >
        <i className="bi bi-plus-lg me-2"></i>
        Add Task
      </button>

      {/* New Task Modal */}
      <div
        className="modal fade"
        id="addTaskModal"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Add A Task...</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Component for adding a new task */}
              <NewTask CreateTask={CreateTask} />
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <div
        className="modal fade"
        id="updateTaskModal"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Update A Task...</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Component for updating a task */}
              <UpdateTask
                taskList={taskList}
                UpdatesTask={UpdatesTask}
                selectedTask={selectedTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
