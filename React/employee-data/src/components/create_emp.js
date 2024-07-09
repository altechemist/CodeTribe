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

  // Add user input to data object
  const AddEmployee = () => {
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
    <div id="Add" className="Tab-content">
      <form className="AddEmployeeForm">
        <h3>Add Employee Information</h3>
        <div className="Name-input">
          <input
            type="text"
            placeholder="Employee ID"
            onChange={(event) => setEmployeeID(event.target.value)}
            value={employeeID}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
        </div>

        <div className="Employee-details">
          <input
            type="text"
            placeholder="eMail Address"
            onChange={(event) => setEmailAddress(event.target.value)}
            value={eMailAddress}
          />
          <br />
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
            value={phoneNumber}
          />
          <br />
          <input
            type="text"
            placeholder="Position"
            onChange={(event) => setPosition(event.target.value)}
            value={position}
          />
        </div>
      </form>

      <button className="Submission" onClick={AddEmployee}>
        Create
      </button>
    </div>
  );
}

export default CreateEmployee;
