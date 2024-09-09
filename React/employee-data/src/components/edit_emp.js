import React, { useState } from "react";

function EditEmployee(props) {
  // Create state variables for text fields
  const [searchID, setSearchID] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null); // Changed to handle File object

  // Filter the employee data
  const FilterEmployees = (employeeID) => {
    if (!employeeID) {
      alert("Employee ID cannot be empty");
      return;
    }

    const filteredEmp = props.EmployeeData.filter((employee) =>
      employee.employeeID.toLowerCase().includes(employeeID.toLowerCase())
    );

    if (filteredEmp.length === 0) {
      alert("User Not Found!");
      return;
    }

    // Update text fields with the filtered employee data
    setEmployeeID(filteredEmp[0].employeeID);
    setFirstName(filteredEmp[0].firstName);
    setLastName(filteredEmp[0].lastName);
    setEmailAddress(filteredEmp[0].eMailAddress);
    setPhoneNumber(filteredEmp[0].phoneNumber);
    setPosition(filteredEmp[0].position);
    setImage(filteredEmp[0].image); // Assuming `image` is a URL or path
  };

  // If employee already selected
  const isEmployeeSelected = props.SelectedEmployee.length === 1;

  // Cancel edit
  const CancelEdit = () => {
    setEmployeeID("");
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPhoneNumber("");
    setPosition("");
    setImage(null); // Clear the image state
    props.SelectEmployee(null);
  };

  // Add user input to data object
  const UpdateEmployee = (event) => {
    // Prevent form submission
    event.preventDefault();

    const isFormValid = props.FormValidation(
      employeeID,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      image
    );

    if (isFormValid) {
      props.UpdateEmployee(
        employeeID,
        firstName,
        lastName,
        eMailAddress,
        phoneNumber,
        position,
        image
      );

      // Clear fields
      setEmployeeID("");
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setPhoneNumber("");
      setPosition("");
      setImage(null);
      CancelEdit();
    }
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div id="Edit" className="container-sm">
      {/* Editing information */}
      <form className="EmployeeForm border p-4 my-4 rounded-4 shadow-lg">
        <h3>Update Employee Information</h3>
        {isEmployeeSelected ? (
          <div className="modal-content d-flex gap-2">
            <p>
              Are you sure you want to edit{" "}
              {props.SelectedEmployee[0].firstName}'s details?{" "}
              {props.SelectedEmployee[0].employeeID}
            </p>
            <div>
              <button
                className="btn btn-success"
                onClick={() =>
                  FilterEmployees(props.SelectedEmployee[0].employeeID)
                }
              >
                Yes
              </button>
              <button className="btn btn-danger mx-2 my-2" onClick={CancelEdit}>
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-3"></div>
        )}

        {/* Display errors */}
        {props.errorList.length > 0 ? (
          <div className="mb-3 alert alert-danger">
            <h6>Whoops! There were some problems with your input</h6>
            <ul>
              {props.errorList.map((errors, index) => (
                <li key={index}>{errors}</li>
              ))}
            </ul>
          </div>
        ) : props.isFormValid ? (
          <div className="mb-3 alert alert-success">
            <h6>Employee Info Successfully Updated!</h6>
          </div>
        ) : null}

        {/* Full Names */}
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            Full Names
          </label>
          <div className="row g-3 align-items-center">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="Jon"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Doe"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={(event) => setEmailAddress(event.target.value)}
            value={eMailAddress}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="0612345678"
            onChange={(event) => setPhoneNumber(event.target.value)}
            value={phoneNumber}
            required
          />
        </div>

        {/* Position */}
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            id="position"
            placeholder="Developer"
            onChange={(event) => setPosition(event.target.value)}
            value={position}
            required
          />
        </div>

        {/* Image Picker */}
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload picture
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
          />
        </div>

        <div className="text-end">
          <button
            className="btn btn-success my-1"
            type="button"
            onClick={() => UpdateEmployee()}
          >
            <i className="bi bi-file-arrow-up me-2"></i>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
