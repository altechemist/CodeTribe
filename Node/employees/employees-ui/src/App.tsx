import "./App.css";
import AddEmployees from "./pages/AddEmployees";
import EditEmployees from "./pages/EditEmployees";
import ViewEmployees from "./pages/ViewEmployees";
import Home from "./pages/Home";

import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Swal from "sweetalert2";

// Define types for employee data
interface Employee {
  idNumber: string;
  firstName: string;
  lastName: string;
  eMailAddress: string;
  phoneNumber: string;
  position: string;
  image: string;
  id?: string;
}

function App() {
  // State for employee data
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [errorList, setErrorList] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
  const [isVisible, setVisibility] = useState<string>("");
  const [currPage, setCurrPage] = useState<string>("Home");
  const [loading, setLoading] = useState<boolean>(false);

  // Employee CRUD operations
  const AddEmployee = async (
    idNumber: string,
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    image: string
    // id?: string
  ) => {
    const newEmployee: Employee = {
      idNumber,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      image,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/addEmployee",
        newEmployee
      );
      const allEmployees = response?.data?.employees;
      setEmployeeData(() => [...allEmployees]);
      setLoading(false);
      console.log(response);
      return true;
    } catch (error) {
      console.error("Error creating new employee: ", error);
      return false;
    }
  };

  // Get employee data
  const FetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/getAllEmployees"
      );
      console.log(response);
      const allEmployees = response.data.employees;
      setEmployeeData(() => [...allEmployees]);
      setLoading(false);
      console.log(allEmployees);
      return true;
    } catch (error) {
      console.error("Error fetching employees: ", error);
      return false;
    }
  };

  // Remove employee
  const RemoveEmployee = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3001/api/deleteEmployee/${id}/`,
        { data: { id } }
      );
      console.log(response);
      FetchEmployees();
      setLoading(false);
      setEmployeeData((prevData) =>
        prevData.filter((employee) => employee.id !== id)
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Employee Removed",
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (error) {
      console.error("Error deleting employee: ", error);
      return false;
    }
  };

  const UpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      setLoading(true);
      const id = selectedEmployee?.id;

      const response = await axios.put(
        `http://localhost:3001/api/updateEmployee/${id}`,
        { id, updates: updatedEmployee }
      );
      FetchEmployees();
      console.log(response);
      setLoading(false);

      return true;
    } catch (error) {
      console.error("Error updating employee: ", error);
      return false;
    }
  };

  const SelectEmployee = (id: string) => {
    const emp = employeeData.find((employee) => employee.id === id) || null;
    setSelectedEmployee(emp);
  };

  const FormValidation = (): boolean => {
    const newErrors: string[] = [];
    // Perform validations...
    setErrorList(newErrors);
    setIsFormValid(newErrors.length === 0);
    return newErrors.length === 0;
  };

  // Navigation
  const navigateTo = (page: string) => {
    setVisibility(page);
    setCurrPage(page);
  };

  // Reload collection on action
  useEffect(() => {
    FetchEmployees();
  }, []);

  return (
    <div className="App">
      <div className="container-sm">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <i
              className="bi bi-house-fill me-2"
              onClick={() => navigateTo("Home")}
            ></i>
            <span className="fs-4">Employee Data</span>
          </a>
          <ul className="nav">
            {["Add", "View", "Update"].map((page) => (
              <li className="nav-item" key={page}>
                <button
                  onClick={() => navigateTo(page)}
                  className="btn btn-outline-primary me-2"
                  style={
                    currPage === page
                      ? { backgroundColor: "#0d6efd", color: "#f7f7f7" }
                      : {}
                  }
                >
                  <i
                    className={`bi bi-${
                      page === "Add"
                        ? "person-plus"
                        : page === "View"
                        ? "search"
                        : "file-arrow-up"
                    } me-2`}
                  ></i>
                  {page} Employees
                </button>
              </li>
            ))}
          </ul>
        </header>
      </div>

      <div className="container-sm px-5">
        {isVisible === "Add" && (
          <AddEmployees
            AddEmployee={AddEmployee}
            FormValidation={FormValidation}
            errorList={errorList}
            isFormValid={isFormValid}
            loading={loading}
          />
        )}
        {isVisible === "View" && (
          <ViewEmployees
            EmployeeData={employeeData}
            RemoveEmployee={RemoveEmployee}
            SelectEmployee={SelectEmployee}
            UpdatePage={() => navigateTo("Update")}
            loading={loading}
          />
        )}
        {isVisible === "Update" && (
          <EditEmployees
            EmployeeData={employeeData}
            UpdateEmployee={UpdateEmployee}
            SelectEmployee={SelectEmployee}
            SelectedEmployee={selectedEmployee}
            FormValidation={FormValidation}
            errorList={errorList}
            isFormValid={isFormValid}
            loading={loading}
          />
        )}
        {currPage === "Home" && <Home />}
      </div>
    </div>
  );
}

export default App;
