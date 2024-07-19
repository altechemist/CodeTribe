import React, { useState, useRef } from "react";

// Prop types for the component
type InputValue = string | undefined;
interface TaskProps {
  // Function update a task
  UpdatesTask: (
    id: InputValue,
    title: InputValue,
    date: InputValue,
    time: InputValue,
    priority: InputValue,
    status: InputValue
  ) => void;
}

const UpdateTask: React.FC<TaskProps> = ({ UpdatesTask }) => {
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

  // Function to handle updating a task
  const handleUpdatesTask = () => {
    const title = titleRef.current?.value || "";
    const date = dateRef.current?.value || "";
    const time = timeRef.current?.value || "";
    const priority = priorityRef.current?.value || "";

    // Validate form
    if (!isFormValid()) {
      return;
    }

    // Create task
    UpdatesTask('0', title, date, time, priority, "Incomplete");

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
      <div className="text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Update A Task...
        </h1>
      </div>

      {/* Start of form */}
      <div className="d-flex justify-content-center">
        <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
          <div className="list-group border rounded-2 p-2 streak">
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
                <div className="mb-3 alert alert-success">
                  <h6>Task Successfully Created!</h6>
                  <button
                    onClick={resetSubmitted}
                    className="btn btn-sm btn-outline-success"
                    style={{ marginTop: "0px", marginLeft: "95%" }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            <div className="list-group-item d-flex gap-1 border-0">
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder="Task Name..."
                  ref={titleRef}
                />
              </div>

              <div className="col-md date-input">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDate"
                  ref={dateRef}
                />
              </div>

              <div className="col-md-2 time-input">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="inputTime"
                  ref={timeRef}
                />
              </div>

              <div className="col-md-2 priority-input">
                <label className="form-label">Priority</label>
                <select
                  id="inputPriority"
                  className="form-select"
                  ref={priorityRef}
                >
                  <option value="">Choose...</option>
                  <option className="text-bg-danger" value="High Priority">High Priority</option>
                  <option className="text-bg-warning" value="Medium Priority">Medium Priority</option>
                  <option className="text-bg-success" value="Low Priority">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end my-2">
              <button
                onClick={() =>
                  handleUpdatesTask()
                }
                className="btn btn-danger me-md-2"
              >
                <i className="bi bi-x-lg me-2"></i>
                Cancel
              </button>

              <button
                onClick={() =>
                  handleUpdatesTask()
                }
                className="btn btn-success me-md-2"
              >
                <i className="bi bi-floppy me-2"></i>
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
