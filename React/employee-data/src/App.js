import "./App.css";
import CreateEmployee from "./components/create_emp";
import EditEmployee from "./components/edit_emp";
import ViewEmployee from "./components/view_emp.";

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

  return (
    <div className="App">
      <div className="Header">
        <h1 className="Title">Employee Data</h1>
        <button className="Tab">Add</button>
        <button className="Tab">View</button>
        <button className="Tab">Edit</button>
      </div>

      {/* Bootstrap tabs */}

      {/* Create different tabs to perform CRUD */}
      <div className="Content-area">
        {/* Adds a new employee */}
        <CreateEmployee AddEmployee={AddEmployee} />

        {/* Edits existing employee */}
        <ViewEmployee
          EmployeeData={employeeData}
          RemoveEmployee={RemoveEmployee}
          SelectEmployee={SelectEmployee}
        />

        {/* Deletes an employee */}
        <EditEmployee
          EmployeeData={employeeData}
          TmpEmployeeData={tmpEmployeeData}
          UpdateEmployee={UpdateEmployee}
          SelectEmployee={SelectEmployee}
          SelectedEmployee={selectedEmployee}
        />
      </div>
    </div>
  );
}

export default App;
