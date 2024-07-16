export default function Task() {
  return (
    <div className="container-sm">
      {/* Current Tasks */}
      <div className="current-tasks">
        <div className="text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Current Tasks
          </h1>
        </div>

        <div className="d-flex justify-content-center">
          <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
            <div className="list-group">
              <label className="list-group-item d-flex gap-4">
                <input
                  className="form-check-input flex-shrink-0"
                  type="checkbox"
                  value=""
                  style={{ fontSize: "1.375em" }}
                />
                <span className="pt-1 form-checked-content">
                  <strong>Finish sales report</strong>
                  <small className="d-block text-body-secondary">
                    <svg className="bi me-1" width="1em" height="1em">
                      <use href="#calendar-event"></use>
                    </svg>
                    1:00–2:00pm
                  </small>
                </span>
              </label>
              <label className="list-group-item d-flex gap-4">
                <input
                  className="form-check-input flex-shrink-0"
                  type="checkbox"
                  value=""
                  style={{ fontSize: "1.375em" }}
                />
                <span className="pt-1 form-checked-content">
                  <strong>Weekly All Hands</strong>
                  <small className="d-block text-body-secondary">
                    <svg className="bi me-1" width="1em" height="1em">
                      <use href="#calendar-event"></use>
                    </svg>
                    2:00–2:30pm
                  </small>
                </span>
              </label>

              <label className="list-group-item d-flex align-items-center justify-content-between">
                <div className="d-flex gap-4">
                  <input
                    className="form-check-input flex-shrink-0"
                    type="checkbox"
                    value=""
                    style={{ fontSize: "1.375em" }}
                  />
                  <span className="pt-1 form-checked-content">
                    <strong>Out of office</strong>
                    <small className="d-block text-body-secondary">
                      <svg className="bi me-1" width="1em" height="1em">
                        <use href="#alarm"></use>
                      </svg>
                      Tomorrow
                    </small>
                  </span>
                </div>

                <div className="btn-group" role="group">
                  <button className="btn btn-secondary btn-sm">
                    <i className="bi bi-pencil me-2"></i>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <i className="bi bi-trash me-2"></i>
                    Delete
                  </button>
                  <button className="btn btn-success btn-sm">
                    <i className="bi bi-check-lg me-2"></i>
                    Done
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Adding a task */}
      <div className="AddTask">
        <div className="text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Add New Task...
          </h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
            <div className="list-group border rounded-2 p-2">
              <div className="list-group-item d-flex gap-1 border-0">
                <div className="col-md-4">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" id="inputTitle" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDescription"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Priority</label>
                  <select id="inputPriority" className="form-select">
                    <option selected>Set...</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end my-2">
                <button className="btn btn-primary me-md-2">
                  <i className="bi bi-plus-lg me-2"></i>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
