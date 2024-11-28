import "./App.css";
import AddEmployees from "./pages/AddEmployees";
import EditEmployees from "./pages/EditEmployees";
import ViewEmployees from "./pages/ViewEmployees";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Swal from "sweetalert2";

// Define custom types
type InputValue = string | number | undefined;

// Define types for employee data
interface Employee {
  idNumber: string;
  firstName: string;
  lastName: string;
  eMailAddress: string;
  phoneNumber: string;
  position: string;
  imageFile: File | null;
  id?: string;
}

function App() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [errorList, setErrorList] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
  const [isVisible, setVisibility] = useState<string>("Home");
  const [currPage, setCurrPage] = useState<string>("Home");
  const [loading, setLoading] = useState<boolean>(false);

  // User state
  const [user, setUser] = useState({});

  // Employee CRUD operations
  const AddEmployee = async (
    idNumber: string,
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    imageFile: File | null
  ): Promise<boolean> => {
    const formData = new FormData();
    formData.append("idNumber", idNumber);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("eMailAddress", eMailAddress);
    formData.append("phoneNumber", phoneNumber);
    formData.append("position", position);
  
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/addEmployee",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setEmployeeData(response.data.employees);
      setLoading(false);
  
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Employee added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (error) {
      console.error("Error creating new employee:", error);
      setLoading(false);
  
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add employee. Please try again.",
        showConfirmButton: true,
      });
      return false;
    }
  };
  

  const UpdateEmployee = async (
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    imageFile: File | null
  ) => {
    const id = selectedEmployee?.id;
    if (!id) return false;
  
    const formData = new FormData();
    formData.append("id", id);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("eMailAddress", eMailAddress);
    formData.append("phoneNumber", phoneNumber);
    formData.append("position", position);
  
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
  
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:3001/api/updateEmployee/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error updating employee:", error);
      return false;
    }
  };
  
  const FetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/getAllEmployees"
      );
      setEmployeeData(response.data.employees);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return false;
    }
  };

  const RemoveEmployee = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/api/deleteEmployee/${id}`, {
        data: { id },
      });
      setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
      setLoading(false);
  
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Employee deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (error) {
      console.error("Error deleting employee:", error);
      setLoading(false);
  
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to delete employee. Please try again.",
        showConfirmButton: true,
      });
      return false;
    }
  };
  


  // User Creation
  const CreateUser = async (
    name: InputValue,
    email: InputValue,
    password: InputValue
  ): Promise<boolean> => {
    const newUser = { uid: undefined, name, email, password };
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/register", newUser);
      
      // Success response
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
  
    } catch (error: any) {
      console.error("Error creating new user:", error.response?.data.error || error.message);
      
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.response?.data.error || error.message || "An error occurred",
        showConfirmButton: true,
      });
      
      setLoading(false);
      return false;
    }
  };
  
  

  // User Authentication
  const LoginUser = async (
    email: InputValue,
    password: InputValue
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      const { uid } = response.data.user;
  
      if (uid) {
        setUser({ uid });
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login failed. Please check your credentials.",
        showConfirmButton: true,
      });
      return false;
    }
  };
  
  // Password reset
  const passwordReset = async (email: InputValue): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/resetEmail",
        {
          email,
        }
      );

      console.log(response);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Reset error:", error);
      return false;
    }
  };

  // Form Validation
  const FormValidation = (): boolean => {
    const newErrors: string[] = [];
    // Implement form validation here
    setErrorList(newErrors);
    setIsFormValid(newErrors.length === 0);
    return newErrors.length === 0;
  };

  // Employee Selection
  const SelectEmployee = (id: string) => {
    const emp = employeeData.find((employee) => employee.id === id) || null;
    setSelectedEmployee(emp);
  };

  // Page navigation
  const navigateTo = (page: string) => {
    setVisibility(page);
    setCurrPage(page);
  };

  useEffect(() => {
    if (currPage === "Home" || currPage === "View") {
      FetchEmployees();
    }
  }, [currPage]);

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

          {Object.keys(user).length > 0 ? (
            <ul className="nav nav-links">
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
          ) : (
            <ul className="nav nav-links">
              {["Login", "Register"].map((page) => (
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
                        page === "Login" ? "file-arrow-up" : "person-plus"
                      } me-2`}
                    ></i>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          )}
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
        {isVisible === "Home" && <Home />}

        {Object.keys(user).length > 0 ? (
          <div className="container-fluid">
            {currPage === "Home" && <Home />}
          </div>
        ) : (
          <div className="container-fluid">
            {isVisible === "Login" && (
              <Login LoginUser={LoginUser} passwordReset={passwordReset} />
            )}
            {isVisible === "Register" && <Register CreateUser={CreateUser} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
