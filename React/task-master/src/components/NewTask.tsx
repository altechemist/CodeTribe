import React, { useRef, useState } from "react";

// Prop types for the component
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
}

const NewTask: React.FC<TaskProps> = ({ CreateTask }) => {
  // Refs for input fields
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);

  // State for success message and errors
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);

  // Validate form
  const isFormValid = (): boolean => {
    const title = titleRef.current?.value || "";
    const date = dateRef.current?.value || "";
    const time = timeRef.current?.value || "";
    const priority = priorityRef.current?.value || "";

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

  // Function to handle creating a task
  const handleCreateTask = () => {
    const title = titleRef.current?.value || "";
    const date = dateRef.current?.value || "";
    const time = timeRef.current?.value || "";
    const priority = priorityRef.current?.value || "";

    // Validate form
    if (!isFormValid()) {
      return;
    }

    // Create task
    CreateTask(title, date, time, priority, "Incomplete");

    // Clear fields
    if (titleRef.current) titleRef.current.value = "";
    if (dateRef.current) dateRef.current.value = "";
    if (timeRef.current) timeRef.current.value = "";
    if (priorityRef.current) priorityRef.current.value = "";

    // Update submitted state
    setSubmitted(true);
  };

  // Function to reset submitted state
  const resetSubmitted = () => {
    setSubmitted(false);
  };

  return (
    <div className="AddTask">
      {/* Start of form */}
      <div className="d-flex justify-content-center">
        <div className="flex-md-row pb-2 align-items-center">
          {/* Display errors here */}
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
                <h6>Task Successfully Added!</h6>
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
                  ref={titleRef}
                />
              </div>

              <div className="col-md-11">
                <label className="form-label ms-3  mt-2">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDate"
                  ref={dateRef}
                />
              </div>

              <div className="col-md-11">
                <label className="form-label ms-3 mt-2">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="inputTime"
                  ref={timeRef}
                />
              </div>

              <div className="col-md-11">
                <label className="form-label ms-3 mt-2">Priority</label>
                <select
                  id="inputPriority"
                  className="form-select"
                  ref={priorityRef}
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

          <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-1">
            <button
              onClick={handleCreateTask}
              className="btn btn-primary me-md-2"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
