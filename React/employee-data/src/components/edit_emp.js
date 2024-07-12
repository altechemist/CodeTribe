import React from "react";
import { useState } from "react";

function EditEmployee(props) {
  // Create state variables for text fields
  const [searchID, setSearchID] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [image, uploadImage] = useState("");

  // Filter the employee data
  const FilterEmployees = (employeeID) => {
    // Find the employee
    const tmpEmployeeData = props.EmployeeData.filter(
      (employee) => employee.employeeID === employeeID
    );

    // If user is not found
    if (tmpEmployeeData[0] == null) alert("User Not Found!");

    // Update text fields
    if (tmpEmployeeData[0]) {
      setEmployeeID(tmpEmployeeData[0].employeeID);
      setFirstName(tmpEmployeeData[0].firstName);
      setLastName(tmpEmployeeData[0].lastName);
      setEmailAddress(tmpEmployeeData[0].eMailAddress);
      setPhoneNumber(tmpEmployeeData[0].phoneNumber);
      setPosition(tmpEmployeeData[0].position);
      uploadImage(tmpEmployeeData[0].image);
    } else {
      props.SelectEmployee(null);
    }
  };

  // If employee already selected
  const isEmployeeSelected = props.SelectedEmployee.length === 1 ? true : false;

  // Cancel edit
  const CancelEdit = () => {
    setEmployeeID("");
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPhoneNumber("");
    setPosition("");

    props.SelectEmployee(null);
  };

  // Add user input to data object
  const UpdateEmployee = () => {
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
        position
      );

      // Clear fields
      setEmployeeID("");
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setPhoneNumber("");
      setPosition("");
      CancelEdit();
    }
  };

  return (
    <div id="Edit" className="container-sm">
      <div>
        <h3>Update Employee Information</h3>
        <div>
          {isEmployeeSelected ? (
            <div className="modal-content d-flex gap-2">
              <p>
                Are you sure you want to edit{" "}
                {props.SelectedEmployee[0].firstName}'s details?
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
                <button
                  className="btn btn-danger mx-2 my-2"
                  onClick={() => CancelEdit()}
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col-sm-6">
                  <input
                    type="text"
                    class="form-control"
                    id="searchID"
                    placeholder={"Enter Employee ID..."}
                    onChange={(event) => setSearchID(event.target.value)}
                    value={searchID}
                    required
                  />
                </div>

                <div class="col-sm-6">
                  <button
                    className="btn btn-primary mx-2 my-2"
                    onClick={() => FilterEmployees(searchID)}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form className="AddEmployeeForm">
        {/* Full Names */}
        <div class="mb-3">
          <label for="fname" class="form-label">
            Full Names
          </label>

          <div class="row g-3 align-items-center">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="fname"
                placeholder="Jon"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="lname"
                placeholder="Doe"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div class="mb-3">
          <label for="email" class="form-label">
            Email Address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={(event) => setEmailAddress(event.target.value)}
            value={eMailAddress}
          />
        </div>

        {/* Phone Number */}
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder="0612345678"
            onChange={(event) => setPhoneNumber(event.target.value)}
            value={phoneNumber}
          />
        </div>

        {/* Position */}
        <div class="mb-3">
          <label for="position" class="form-label">
            Position
          </label>
          <input
            type="text"
            class="form-control"
            id="position"
            placeholder="Developer"
            onChange={(event) => setPosition(event.target.value)}
            value={position}
          />
        </div>
      </form>

      <button className="btn btn-success" onClick={UpdateEmployee}>
        Update
      </button>
    </div>
  );
}

export default EditEmployee;
