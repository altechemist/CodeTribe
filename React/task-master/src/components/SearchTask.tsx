export default function SearchTask() {
  return (
    <div className="d-flex justify-content-center">
      <div className="input-group w-75 mt-4 align-items-center streak search-bar">
        <input
          type="text"
          className="form-control search"
          placeholder="Task Name..."
          aria-label="Task Name"
        />
        <button className="btn btn-secondary-outline" type="button" id="button-addon2">
          <i className="bi bi-search me-2 search-btn"></i>
          Search
        </button>
      </div>
    </div>
  );
}
