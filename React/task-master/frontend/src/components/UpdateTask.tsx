import React, { useState, useEffect } from "react";

// Prop types for the component
type InputValue = string | number | undefined;

interface TaskProps {
  taskList: {
    title: InputValue;
    date: InputValue;
    time: InputValue;
    priority: InputValue;
    status: InputValue;
    uid?: InputValue
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
  
  // State for success message and errors
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);

  // Effect to load form data based on selected task
  useEffect(() => {
    if (selectedTask != null) {
      const task: number = Number(selectedTask);
      if (task >= 0 && task < taskList.length) {
        const selectedTaskDetails = taskList[task];
        setTitle(selectedTaskDetails.title || "");
        setDate(selectedTaskDetails.date || "");
        setTime(selectedTaskDetails.time || "");
        setPriority(selectedTaskDetails.priority || "");
      }
    }
  }, [selectedTask, taskList]);

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
    if (!isFormValid()) {
      return;
    }

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
  const resetSubmitted = () => {
    setSubmitted(false);
  };

  return (
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
    </div>
  );
};

export default UpdateTask;
