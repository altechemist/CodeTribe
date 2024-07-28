import React from "react";
import CurrentTask from "../components/CurrentTask";
import UpdateTask from "../components/UpdateTask";
import NewTask from "../components/NewTask";
import SearchTask from "../components/SearchTask";

type InputValue = string | number | undefined;

interface Task {
  id: number;
  title: InputValue;
  date: InputValue;
  time: InputValue;
  priority: InputValue;
  status: InputValue;
  uid: InputValue; // Ensure uid is included
}

interface TaskProps {
  userID: number | undefined;

  // Create a new Task
  CreateTask: (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => Promise<void>;
  taskList: Task[]; // Ensure this matches the type in CurrentTask

  // Track selected tasks
  selectedTask: InputValue;
  SelectTask: (id: InputValue) => void;

  // Updates a task
  UpdatesTask: (
    id: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => Promise<void>;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TaskProps> = ({
  CreateTask,
  taskList,
  UpdatesTask,
  selectedTask,
  SelectTask,
  userID,
  setTaskList,
}) => {
  return (
    <div className="container-sm">
      <div className="current-tasks">
        <div className="text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Current Tasks
          </h1>
        </div>
        <SearchTask />
        <CurrentTask
          taskList={taskList}
          userID={userID}
          SelectTask={SelectTask}
          setTaskList={setTaskList}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary floating"
        data-bs-toggle="modal"
        data-bs-target="#addTaskModal"
      >
        <i className="bi bi-plus-lg me-2"></i>
        Add Task
      </button>

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
              <NewTask CreateTask={CreateTask} />
            </div>
          </div>
        </div>
      </div>

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

export default Tasks;
