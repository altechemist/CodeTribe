import React from "react";
import CurrentTask from "../components/CurrentTask";
import UpdateTask from "../components/UpdateTask";
import NewTask from "../components/NewTask";
import SearchTask from "../components/SearchTask";

<<<<<<< HEAD
import WelcomeHeader from "../components/WelcomeHeader";
import CompletedTask from "../components/CompletedTask";

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

interface TaskProps {
  userID: number | undefined;

  // Create a new Task
=======
// Prop types for the Task component
type InputValue = string | number | undefined;

interface TaskProps {
  // Function adds new task
  userID: number | undefined;
 
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  CreateTask: (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
<<<<<<< HEAD
  ) => Promise<void>;
  taskList: Task[];

  // Track selected tasks
  selectedTask: InputValue;
  SelectTask: (id: InputValue) => void;

  // Updates a task
  UpdatesTask: (
    id: InputValue,
=======
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
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
<<<<<<< HEAD
  ) => Promise<void>;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;

}

const Tasks: React.FC<TaskProps> = ({
=======
  ) => void;
}

const Task: React.FC<TaskProps> = ({
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  CreateTask,
  taskList,
  UpdatesTask,
  selectedTask,
  SelectTask,
<<<<<<< HEAD
  userID,
  setTaskList
}) => {
  return (
    <div>
      {userID ? (
        <div className="container-sm">
          <div className="current-tasks">
            <SearchTask taskList={taskList} SelectTask={SelectTask} />
            <CurrentTask
              taskList={taskList}
              userID={userID}
              SelectTask={SelectTask}
              setTaskList={setTaskList}
              UpdatesTask={UpdatesTask}
              selectedTask={selectedTask}
            />
            <CompletedTask
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
                    id="closeAddTask"
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
                    id="closeUpdateTask"
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
      ) : (
        <WelcomeHeader />
      )}
=======
  userID
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
        <CurrentTask userID={userID} SelectTask={SelectTask} />
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
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    </div>
  );
};

<<<<<<< HEAD
export default Tasks;
=======
export default Task;
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
