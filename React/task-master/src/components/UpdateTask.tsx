export default function UpdateTask() {
  return (
    <div className="AddTask">
      <div className="text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">Update Task...</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="w-75 flex-md-row p-4 py-md-5 align-items-center">
          <div className="list-group border rounded-2 p-2 streak">
            <div className="list-group-item d-flex gap-1 border-0">
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder="Task Name..."
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDescription"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Select Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="inputDescription"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Priority</label>
                <select id="inputPriority" className="form-select">
                  <option selected>Choose...</option>
                  <option className="danger">High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end my-2">
              <button className="btn btn-primary me-md-2">
                <i className="bi bi-floppy me-2"></i>
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
