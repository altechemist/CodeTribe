import React from "react";

// Define prop types for the Task component
interface TaskProps {
  taskList: {
    title: string;
    date: string;
    time: string;
    priority: string;
  }[];
}

const CurrentTask: React.FC<TaskProps> = ({ taskList }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
        <div className="list-group gap-2">
          {taskList.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong> - {task.date}, {task.time},{" "}
              {task.priority}
            </li>
          ))}

          <label className="list-group-item d-flex align-items-center text-light bg-danger justify-content-between rounded-4 streak">
            <div className="d-flex gap-4">
              <input
                className="form-check-input flex-shrink-0 outline"
                type="checkbox"
                value=""
                style={{ fontSize: "1.375em" }}
              />
              <span className="pt-1 form-checked-content">
                <strong className="text-light">Out of office</strong>
                <small className="d-block text-body-primary">
                  <i className="bi bi-calendar-event me-1"></i>
                  1:00–2:00pm
                </small>
              </span>
            </div>
            <span className="badge bg-danger outline">High Priority</span>
            <div className="btn-group gap-2" role="group">
              <button className="btn btn-secondary btn-sm outline">
                <i className="bi bi-pencil me-2"></i>
                Edit
              </button>
              <button className="btn btn-danger btn-sm outline">
                <i className="bi bi-trash me-2"></i>
                Delete
              </button>
              <button className="btn btn-success btn-sm outline">
                <i className="bi bi-check-lg me-2"></i>
                Done
              </button>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
