import React, { useState } from "react";

// Define types for input values
type InputValue = string | number | undefined;

// Define types for task and props
interface Task {
  id: number;
  title: InputValue;
  date: InputValue;
  time: InputValue;
  priority: InputValue;
  status: InputValue;
  uid: InputValue;
}

interface SearchProps {
  // Function to select a task
  SelectTask: (id: number | null) => void;
  taskList: Task[];
}

const SearchTask: React.FC<SearchProps> = ({ SelectTask, taskList }) => {
  // State for search input
  const [searchInput, setSearchInput] = useState("");

  // Show update modal
  const showUpdateModal = () => {
    const updateButton = document.querySelector("#updateTaskModal");
    if (updateButton) {
      (updateButton as HTMLElement).click();
    }
  };

  // Filter tasks based on search input
  const handleSearch = () => {
    // Normalize search input and task titles to lower case
    const normalizedSearchInput = searchInput.trim().toLowerCase();
    const filteredTask = taskList.find(
      (task) => (task.title as string).toLowerCase() === normalizedSearchInput
    );

    if (filteredTask) {
      SelectTask(filteredTask.id);
      alert("Task: " + filteredTask.title);

      // Show update modal dialog
      showUpdateModal();
    } else {
      // Clear selected task if no matching task found
      SelectTask(null);
      alert("Task not found");
    }

    // Clear search input after selection
    setSearchInput("");
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">Find A Task</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="input-group w-75 mt-4 align-items-center streak search-bar">
          <input
            type="text"
            className="form-control search"
            placeholder="Task Name..."
            aria-label="Task Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-secondary-outline"
            type="button"
            id="button-addon2"
          >
            <i className="bi bi-search me-2 search-btn"></i>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchTask;
