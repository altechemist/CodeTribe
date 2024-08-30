import React, { useState } from "react";

// Prop types for the component
type InputValue = string;
interface TaskProps {
  CreateTask: (
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => void;
}

const NewTask: React.FC<TaskProps> = ({ CreateTask }) => {
  // State for form inputs
  const [title, setTitle] = useState<InputValue>("");
  const [date, setDate] = useState<InputValue>("");
  const [time, setTime] = useState<InputValue>("");
  const [priority, setPriority] = useState<InputValue>("");

  // State for success message and errors
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);

  // Validate form
  const isFormValid = (): boolean => {
    const newErrors: string[] = [];

    if (title === "") {
      newErrors.push("Please provide a title.");
    }
    if (date === "") {
      newErrors.push("Please select a date.");
    }
    if (time === "") {
      newErrors.push("Please select a time.");
    }
    if (priority === "") {
      newErrors.push("Please choose a priority.");
    }

    setErrorList(newErrors);

    return newErrors.length === 0;
  };

  // Function to close the modal
  const closeModal = () => {
    const closeButton = document.querySelector("#closeAddTask");
    if (closeButton) {
      (closeButton as HTMLElement).click();
    }
  };

  // Function to handle creating a task
  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form
    if (!isFormValid()) {
      return;
    }

    // Create task
    CreateTask(title, date, time, priority, "Incomplete");

    // Clear fields
    setTitle("");
    setDate("");
    setTime("");
    setPriority("");

    // Update submitted state
    setSubmitted(true);

    // Close modal after successful creation
    closeModal();
  };

  // Function to reset submitted state
  const resetSubmitted = () => {
    setSubmitted(false);
  };

  return (
    <div className="AddTask">
      <form onSubmit={handleCreateTask}>
        {/* Display errors here */}
        {errorList.length > 0 && (
          <div className="mb-3 alert error-list">
            <h6>Whoops! There were some problems with your input:</h6>
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
            <h6>Task Successfully Added!</h6>
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
          <button
            type="submit"
            className="btn btn-primary me-md-2 floating-button"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
