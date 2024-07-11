import "./App.css";
import CreateEmployee from "./components/create_emp";
import EditEmployee from "./components/edit_emp";
import ViewEmployee from "./components/view_emp.";
import HomePage from "./components/home";

import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  // A list of employee data
  const [employeeData, setEmployeeData] = useState([]);

  // Add employee data to list
  const AddEmployee = (
    employeeID,
    firstName,
    lastName,
    eMailAddress,
    phoneNumber,
    position
  ) => {
    let newEmployee = {
      employeeID,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
    };
    setEmployeeData((employeeData) => [...employeeData, newEmployee]);
  };

  // Delete employee using their ID
  const [tmpEmployeeData, setTmpEmployeeData] = useState([]);
  const RemoveEmployee = (employeeID) => {
    // Remove employee
    const newEmployeeData = employeeData.filter(
      (employee) => employee.employeeID !== employeeID
    );

    // Update employee data
    setTmpEmployeeData(newEmployeeData);
    setEmployeeData(newEmployeeData);
  };

  // Update employee data
  const UpdateEmployee = (
    employeeID,
    firstName,
    lastName,
    eMailAddress,
    phoneNumber,
    position
  ) => {
    let tmpEmployee = {
      employeeID,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
    };

    // Find the index of employee
    let index = employeeData.findIndex(function (employee) {
      return employee.employeeID === employeeID;
    });

    // Set new values
    employeeData[index] = tmpEmployee;
    setEmployeeData((employeeData) => [...employeeData]);
  };

  // Track selected employee
  const [selectedEmployee, SetSelectedEmployee] = useState([]);

  const SelectEmployee = (employeeID) => {
    const selectedEmployeeData = employeeData.filter(
      (employee) => employee.employeeID === employeeID
    );

    SetSelectedEmployee(selectedEmployeeData);
  };

  // Show tabs
  const [isVisible, SetVisibility] = useState("");

  const AddPage = () => {
    SetVisibility("Add");
    setCurrPage("Add");
  };

  const ViewPage = () => {
    SetVisibility("View");
    setCurrPage("View");
  };

  const UpdatePage = () => {
    SetVisibility("Update");
    setCurrPage("Update");
  };

  const Home = () => {
    SetVisibility("");
    setCurrPage("Home");
  };

  const [currPage, setCurrPage] = useState("Home");

  return (
    <div className="App">
      <div class="container-sm">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
          <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg class="bi me-2" width="40" height="32" onClick={Home} />
            <span class="fs-4">Employee Data</span>
          </a>

          <ul class="nav">
            <li class="nav-item">
              <button onClick={AddPage} class="btn btn-outline-primary me-2">
                Add Employees
              </button>
            </li>

            <li class="nav-item">
              <button onClick={ViewPage} class="btn btn-outline-primary me-2">
                View Employees
              </button>
            </li>
            <li class="nav-item">
              <button onClick={UpdatePage} class="btn btn-outline-primary me-2">
                Update Employees
              </button>
            </li>
          </ul>
        </header>
      </div>

      {/* Create different tabs to perform CRUD */}
      <div className="container-sm px-5">
        {/* Adds a new employee */}
        {isVisible === "Add" ? (
          <CreateEmployee AddEmployee={AddEmployee} />
        ) : (
          () => setCurrPage("Add")
        )}

        {/* View existing employees */}
        {isVisible === "View" ? (
          <ViewEmployee
            EmployeeData={employeeData}
            RemoveEmployee={RemoveEmployee}
            SelectEmployee={SelectEmployee}
          />
        ) : (
          () => setCurrPage("View")
        )}

        {/* Updates an employee */}
        {isVisible === "Update" ? (
          <EditEmployee
            EmployeeData={employeeData}
            TmpEmployeeData={tmpEmployeeData}
            UpdateEmployee={UpdateEmployee}
            SelectEmployee={SelectEmployee}
            SelectedEmployee={selectedEmployee}
          />
        ) : (
          () => setCurrPage("Update")
        )}

        {/* Show default homepage */}
        {currPage === "Home" ? <HomePage /> : () => setCurrPage("")}
      </div>
    </div>
  );
}

export default App;
