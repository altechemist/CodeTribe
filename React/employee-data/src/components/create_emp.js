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
  const [image, uploadImage] = useState("");

  // Check if input valid
  const AddEmployee = () => {
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
      props.AddEmployee(
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
    }
  };

  return (
    <div id="Add" className="container-sm">
      <form className="AddEmployeeForm">
        <h3>Add Employee Information</h3>

        {/* Display errors */}
        {props.errorList.length > 0 ? (
          <div class="mb-3 alert alert-danger">
            <h6>Whoops! There were some problems with your input</h6>
            <ul>
              {props.errorList.map((errors) => (
                <li>{errors}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {props.isFormValid ? (
              <div class="mb-3 alert alert-success">
                <h6>Employee Successfully Created!</h6>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}

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
          <input
            class="form-control"
            type="file"
            id="formFile"
            onChange={(event) => uploadImage(event.target.value)}
            value={image}
            required
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={AddEmployee}>
        Create
      </button>
    </div>
  );
}

export default CreateEmployee;
