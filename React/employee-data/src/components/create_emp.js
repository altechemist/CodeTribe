import React from "react";
import { useState } from "react";

function CreateEmployee(props) {
  // Create state variables for text fields
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");

  // Check if input valid
  const FormValid = () => {
    if (employeeID === "") {
      alert("Enter a valid employee id");
      return false;
    }
  };

  // Add user input to data object
  const AddEmployee = () => {
    alert(FormValid());

    // Check if input valid
    props.AddEmployee(
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
  };

  return (
    <div id="Add" className="container-sm">
      <form className="AddEmployeeForm">
        <h3>Add Employee Information</h3>

        {/* Employee ID */}
        <div class="mb-3">
          <label for="fname" class="form-label">
            Employee ID
          </label>

          <div class="row g-3 align-items-center">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="empID"
                placeholder="101"
                onChange={(event) => setEmployeeID(event.target.value)}
                value={employeeID}
                required
              />
            </div>
          </div>
        </div>

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
                required
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
                required
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
            required
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
            required
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
            required
          />
        </div>

        {/* Image Picker */}
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Upload picture
          </label>
          <input class="form-control" type="file" id="formFile" required />
        </div>
        <button className="btn btn-primary" onClick={AddEmployee}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee;
