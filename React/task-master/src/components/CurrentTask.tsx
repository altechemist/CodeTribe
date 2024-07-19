import React, { useState } from "react";

// Prop types Task component
type InputValue = string | undefined;
interface TaskProps {
  taskList: {
    title: InputValue;
    date: InputValue;
    time: InputValue;
    priority: InputValue;
    status: InputValue;
  }[];
}

const CurrentTask: React.FC<TaskProps> = ({ taskList }) => {
  // Change the color based on priority
  const colorPicker = (priority: InputValue) => {
    switch (priority) {
      case "High Priority":
        return "#dc3545";
      case "Medium Priority":
        return "#ffc107";
      case "Low Priority":
        return "#198754";
      default:
        return "black";
    }
  };

  // Track the selected task
  const [selectedTask, setSelectTask] = useState<number>();
  const SelectTask = (id: number) => {
    setSelectTask(id)
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
        <div className="list-group gap-2">
          {/* Render the task list */}
          <div className="list-group gap-2">
            {taskList.map((task, index) => (
              <label
                key={index}
                className="list-group-item d-flex align-items-center justify-content-between rounded-4 streak text-light"
                style={{ backgroundColor: colorPicker(task.priority) }}
              >
                <div className="d-flex gap-4">
                  <input
                    className="form-check-input flex-shrink-0 outline mt-3"
                    type="checkbox"
                    value=""
                    style={{ fontSize: "1.375em" }}
                  />
                  <span className="pt-1 form-checked-content">
                    <strong className="text-light">{task.title}</strong>
                    <small className="d-block text-body-primary mb-2">
                      <i className="bi bi-alarm me-1"></i>
                      {task.time}, {task.date}
                    </small>
                  </span>
                </div>
                <span
                  className="badge outline mx-1"
                  style={{ backgroundColor: colorPicker(task.priority) }}
                >
                  {task.priority}
                </span>
                <div className="btn-group gap-1" role="group">
                  <button onClick={() => SelectTask(index)} className="btn btn-secondary btn-sm outline">
                    <i className="bi bi-pencil me-1"></i>
                    Edit {index}
                  </button>
                  <button className="btn btn-danger btn-sm outline">
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                  <button className="btn btn-success btn-sm outline">
                    <i className="bi bi-check-lg me-1"></i>
                    Done
                  </button>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <h1>Selected: {selectedTask}</h1>
    </div>
  );
};

export default CurrentTask;
