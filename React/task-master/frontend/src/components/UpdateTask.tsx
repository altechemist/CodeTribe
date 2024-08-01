import React, { useState, useEffect } from "react";

<<<<<<< HEAD
// Define types for input values
type InputValue = string | number | undefined;

// Define prop types for the UpdateTask component
interface TaskProps {
  taskList: {
    id: number;
=======
// Prop types for the component
type InputValue = string | number | undefined;

interface TaskProps {
  taskList: {
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    title: InputValue;
    date: InputValue;
    time: InputValue;
    priority: InputValue;
    status: InputValue;
<<<<<<< HEAD
    uid?: InputValue;
=======
    uid?: InputValue
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  }[];

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

const UpdateTask: React.FC<TaskProps> = ({
  UpdatesTask,
  selectedTask,
  taskList,
}) => {
  // State for form inputs
  const [title, setTitle] = useState<InputValue>("");
  const [date, setDate] = useState<InputValue>("");
  const [time, setTime] = useState<InputValue>("");
  const [priority, setPriority] = useState<InputValue>("");
<<<<<<< HEAD

=======
  
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  // State for success message and errors
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);

<<<<<<< HEAD
  useEffect(() => {
    // Check if selectedTask is valid and find the task with the matching taskid
    if (selectedTask !== null && selectedTask !== undefined) {
      const selectedTaskId = Number(selectedTask);

      // Find the task in the taskList
      const selectedTaskDetails = taskList.find(task => task.id === selectedTaskId);

      if (selectedTaskDetails) {
        // Populate form fields with selected task details
=======
  // Effect to load form data based on selected task
  useEffect(() => {
    if (selectedTask != null) {
      const task: number = Number(selectedTask);
      if (task >= 0 && task < taskList.length) {
        const selectedTaskDetails = taskList[task];
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
        setTitle(selectedTaskDetails.title || "");
        setDate(selectedTaskDetails.date || "");
        setTime(selectedTaskDetails.time || "");
        setPriority(selectedTaskDetails.priority || "");
<<<<<<< HEAD
      } else {
        // Optionally clear fields if no task found
        setTitle("");
        setDate("");
        setTime("");
        setPriority("");
=======
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      }
    }
  }, [selectedTask, taskList]);

<<<<<<< HEAD
  // Validate form inputs
  const isFormValid = (): boolean => {
    const newErrors: string[] = [];

    // Check for empty fields
    if (title === "") newErrors.push("Please provide a title...");
    if (date === "") newErrors.push("Please select a date...");
    if (time === "") newErrors.push("Please select a time...");
    if (priority === "") newErrors.push("Please choose priority...");

    // Update error list state
    setErrorList(newErrors);

    // Return validity based on error list
    return newErrors.length === 0;
  };

  // Function to close the modal
  const closeModal = () => {
    const closeButton = document.querySelector("#closeUpdateTask");
    if (closeButton) {
      (closeButton as HTMLElement).click();
    }
  };

  // Handle form submission to update task
  const handleUpdatesTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form before proceeding
=======
  // Validate form
  const isFormValid = (): boolean => {
    const newErrors: string[] = [];

    if (title === "") {
      newErrors.push("Please provide a title...");
    }
    if (date === "") {
      newErrors.push("Please select a date...");
    }
    if (time === "") {
      newErrors.push("Please select a time...");
    }
    if (priority === "") {
      newErrors.push("Please choose priority...");
    }

    setErrorList(newErrors);

    // Return validity based on errors and field values
    return newErrors.length === 0;
  };

  // Function to handle updating a task
  const handleUpdatesTask = () => {
    // Validate form
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    if (!isFormValid()) {
      return;
    }

<<<<<<< HEAD
    // Proceed to update task
    if (selectedTask !== null && selectedTask !== undefined) {
      const selectedTaskId = Number(selectedTask);

      // Debug log
      console.log("Submitting Task ID:", selectedTaskId);

      UpdatesTask(selectedTaskId, title, date, time, priority, "Incomplete");

      // Clear form fields and set submission state
      setTitle("");
      setDate("");
      setTime("");
      setPriority("");
      setSubmitted(true);

      closeModal();
    }
  };

  // Reset submission state
=======
    // Create task
    UpdatesTask("0", title, date, time, priority, "Incomplete");

    // Clear fields
    setTitle("");
    setDate("");
    setTime("");
    setPriority("");

    // Update submitted state
    setSubmitted(true);
  };

  // Function to reset submitted state
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
  const resetSubmitted = () => {
    setSubmitted(false);
  };

  return (
<<<<<<< HEAD
    <div className="UpdateTask">
      <form onSubmit={handleUpdatesTask}>
        {/* Display validation errors */}
        {errorList.length > 0 && (
          <div className="mb-3 alert error-list">
            <h6>Whoops! There were some problems with your input</h6>
            <ul className="list-group">
              {errorList.map((error, index) => (
                <li key={index} className="error">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display success confirmation */}
        {submitted && (
          <div
            className="mb-3 alert alert-success alert-dismissible"
            role="alert"
          >
            <h6>Task Successfully Updated!</h6>
            <button
              onClick={resetSubmitted}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="list-group rounded-2 p-2">
          <div className="list-group-item flex gap-1 border-0">
            <div className="col-md-11">
              <label className="form-label ms-3">Title</label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                placeholder="Task Name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-md-11">
              <label className="form-label ms-3 mt-2">Date</label>
              <input
                type="date"
                className="form-control"
                id="inputDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-md-11">
              <label className="form-label ms-3 mt-2">Time</label>
              <input
                type="time"
                className="form-control"
                id="inputTime"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="col-md-11">
              <label className="form-label ms-3 mt-2">Priority</label>
              <select
                id="inputPriority"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Choose...</option>
                <option className="text-bg-danger" value="High">
                  High Priority
                </option>
                <option className="text-bg-warning" value="Medium">
                  Medium Priority
                </option>
                <option className="text-bg-success" value="Low">
                  Low Priority
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-3">
          <button type="submit" className="btn btn-success me-md-2">
            <i className="bi bi-floppy me-2"></i>
            Update Task {selectedTask}
          </button>
        </div>
      </form>
=======
    <div className="AddTask">
      {/* Start of form */}
      <div className="d-flex justify-content-center">
        <div className="flex-md-row pb-2 align-items-center">
          <div className="mb-4 m-2">
            {errorList.length > 0 && (
              <div className="mb-3 alert error-list">
                <h6>Whoops! There were some problems with your input</h6>
                <ul className="list-group">
                  {errorList.map((error, index) => (
                    <li key={index} className="error">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confirmation */}
            {submitted && (
              <div
                className="mb-3 alert alert-success alert-dismissible"
                role="alert"
              >
                <h6>Task Successfully Updated!</h6>
                <button
                  onClick={resetSubmitted}
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                ></button>
              </div>
            )}
          </div>

          <div className="list-group rounded-2 p-2">
            <div className="list-group-item flex gap-1 border-0">
              <div className="col-md-11">
                <label className="form-label ms-3">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder="Task Name..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-md-11">
                <label className="form-label ms-3 mt-2">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="col-md-11">
                <label className="form-label ms-3 mt-2">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="inputTime"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="col-md-11">
                <label className="form-label ms-3 mt-2">Priority</label>
                <select
                  id="inputPriority"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option className="text-bg-danger" value="High">
                    High Priority
                  </option>
                  <option className="text-bg-warning" value="Medium">
                    Medium Priority
                  </option>
                  <option className="text-bg-success" value="Low">
                    Low Priority
                  </option>
                </select>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-2">
              <button
                onClick={handleUpdatesTask}
                className="btn btn-success me-md-2"
              >
                <i className="bi bi-floppy me-2"></i>
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    </div>
  );
};

export default UpdateTask;
