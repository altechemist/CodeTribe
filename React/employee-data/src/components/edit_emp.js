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

  // Filter the employee data
  const FilterEmployees = (employeeID) => {
    // Find the employee
    const tmpEmployeeData = props.EmployeeData.filter(
      (employee) => employee.employeeID === employeeID
    );

    console.log("searching for:", employeeID);
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
    }
  };

  // Add user input to data object
  const UpdateEmployee = () => {
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
  };

  return (
    <div id="Edit" className="Tab-content">
      <div>
        <h3>Search for an Employee</h3>
        <input
          type="text"
          placeholder="Enter Employee ID..."
          onChange={(event) => setSearchID(event.target.value)}
        />
        <button
          className="Submission"
          onClick={() => FilterEmployees(searchID)}
        >
          Search
        </button>
      </div>

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

      <button className="Submission" onClick={UpdateEmployee}>
        Update
      </button>
    </div>
  );
}

export default EditEmployee;
