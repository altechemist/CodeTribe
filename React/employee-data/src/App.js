import "./App.css";
import CreateEmployee from "./components/create_emp";
import EditEmployee from "./components/edit_emp";
import ViewEmployee from "./components/view_emp.";
import HomePage from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [employeeData, setEmployeeData] = useState(() => {
    // Load initial state from local storage
    const storedData = localStorage.getItem("employeeData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [user, setUser] = useState({});
  let isUser = false;

  // Add employee data to list
const AddEmployee = (
  employeeID,
  firstName,
  lastName,
  eMailAddress,
  phoneNumber,
  position,
  image
) => {
  const newEmployee = {
    employeeID,
    firstName,
    lastName,
    eMailAddress,
    phoneNumber,
    position,
    image,
  };

  // Update employee data state
  setEmployeeData((prevEmployeeData) => {
    const updatedEmployeeData = [...prevEmployeeData, newEmployee];
    
    // Save the updated employee data to local storage
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployeeData));
    
    return updatedEmployeeData; // Return the new state
  });
};


  // Validate user input
  const [errorList, addError] = useState([]);
  const [isFormValid, setValidity] = useState(null);

  const FormValidation = (
    employeeID,
    firstName,
    lastName,
    eMailAddress,
    phoneNumber,
    position
  ) => {
    const newErrors = [];
    if (employeeID === "") {
      newErrors.push("Employee ID Missing...");
    }

    if (employeeID.length !== 13) {
      newErrors.push("Employee ID must be 13 digits...");
    }

    if (Number.isInteger(employeeID)) {
      newErrors.push("Employee ID must be a digit...");
    }

    if (firstName === "") {
      newErrors.push("First Name Missing...");
    }

    if (lastName === "") {
      newErrors.push("Last Name Missing...");
    }

    // Email Validation
    if (eMailAddress === "") {
      newErrors.push("Email Missing...");
    }

    if (!eMailAddress.includes("@", ".")) {
      newErrors.push("Invalid Email...");
    }

    // Phone Number Validation
    if (phoneNumber === "") {
      newErrors.push("Phone Missing...");
    }

    if (phoneNumber.length !== 10) {
      newErrors.push("Phone must be 10 digits...");
    }

    if (position === "") {
      newErrors.push("Position Missing...");
    }

    addError(newErrors);

    if (newErrors.length === 0) {
      setValidity(true);
      return true;
    } else {
      return false;
    }
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
    localStorage.setItem("employeeData", JSON.stringify(employeeData));
  };

  // Update employee data
  const UpdateEmployee = (
    employeeID,
    firstName,
    lastName,
    eMailAddress,
    phoneNumber,
    position,
    image
  ) => {
    let tmpEmployee = {
      employeeID,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      image,
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

  // Load employee data from local storage on initial render
  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("employeeData"));
        if (storedData) {
          setEmployeeData(storedData);
        }
      } catch (error) {
        console.error(
          "Failed to load employee data from local storage:",
          error
        );
      }
    };

    loadData();
  }, []);


  useEffect(()=>{
    // Update employee data
    localStorage.setItem("employeeData", JSON.stringify(employeeData));
  }, [employeeData])

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

  const LoginPage = () => {
    SetVisibility("Login");
    setCurrPage("Login");
  };

  const RegisterPage = () => {
    SetVisibility("Register");
    setCurrPage("Register");
  };

  const Home = () => {
    SetVisibility("");
    setCurrPage("Home");
  };

  const [currPage, setCurrPage] = useState("Home");

  // Button styles
  const buttonStyles = {
    default: {
      backgroundColor: "#f7f7f7",
      borderRadius: "5px",
      color: "#0d6efd",
      cursor: "pointer",
    },
    active: {
      backgroundColor: "#0d6efd",
      border: "3x solid #0d6efd",
      color: "#f7f7f7",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  // If user object is not null
  if (user.name !== undefined) {
    isUser = true;
  }

  return (
    <div className="App">
      <div class="container-sm">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
          <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <i
              class="bi bi-house-fill me-2"
              width="40"
              height="32"
              onClick={Home}
            ></i>
            <span class="fs-4">Employee Data</span>
          </a>

          <ul class="nav" hidden={!isUser}>
            <li class="nav-item">
              <button
                onClick={AddPage}
                class="btn btn-outline-primary me-2"
                style={
                  currPage === "Add"
                    ? buttonStyles.active
                    : buttonStyles.default
                }
              >
                <i class="bi bi-person-plus me-2"></i>
                Add Employees
              </button>
            </li>

            <li class="nav-item">
              <button
                onClick={ViewPage}
                class="btn btn-outline-primary me-2"
                style={
                  currPage === "View"
                    ? buttonStyles.active
                    : buttonStyles.default
                }
              >
                <i class="bi bi-search me-2"></i>
                View Employees
              </button>
            </li>
            <li class="nav-item">
              <button
                onClick={UpdatePage}
                class="btn btn-outline-primary me-2"
                style={
                  currPage === "Update"
                    ? buttonStyles.active
                    : buttonStyles.default
                }
              >
                <i class="bi bi-file-arrow-up me-2"></i>
                Update Employees
              </button>
            </li>
          </ul>

          <ul class="nav" hidden={isUser}>
            <li class="nav-item">
              <button
                onClick={LoginPage}
                class="btn btn-outline-primary me-2"
                style={
                  currPage === "Login"
                    ? buttonStyles.active
                    : buttonStyles.default
                }
              >
                <i class="bi bi-search me-2"></i>
                Login
              </button>
            </li>
            <li class="nav-item">
              <button
                onClick={RegisterPage}
                class="btn btn-outline-primary me-2"
                style={
                  currPage === "Register"
                    ? buttonStyles.active
                    : buttonStyles.default
                }
              >
                <i class="bi bi-file-arrow-up me-2"></i>
                Register
              </button>
            </li>
          </ul>
        </header>
      </div>

      {/* Create different tabs to perform CRUD */}
      <div className="container-sm px-5">
        {/* Adds a new employee */}
        {isVisible === "Add" ? (
          <CreateEmployee
            AddEmployee={AddEmployee}
            FormValidation={FormValidation}
            errorList={errorList}
            isFormValid={isFormValid}
          />
        ) : (
          () => setCurrPage("Add")
        )}

        {/* View existing employees */}
        {isVisible === "View" ? (
          <ViewEmployee
            EmployeeData={employeeData}
            RemoveEmployee={RemoveEmployee}
            SelectEmployee={SelectEmployee}
            UpdatePage={UpdatePage}
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
            FormValidation={FormValidation}
            errorList={errorList}
            isFormValid={isFormValid}
          />
        ) : (
          () => setCurrPage("Update")
        )}

        {/* logs in a user */}
        {isVisible === "Login" ? (
          <Login setUser={setUser} Home={Home} />
        ) : (
          () => setCurrPage("Login")
        )}

        {/* registers a user */}
        {isVisible === "Register" ? (
          <Register setUser={setUser} Home={Home} />
        ) : (
          () => setCurrPage("Register")
        )}

        {/* Show default homepage */}
        {currPage === "Home" ? <HomePage /> : () => setCurrPage("")}
      </div>
    </div>
  );
}

export default App;
