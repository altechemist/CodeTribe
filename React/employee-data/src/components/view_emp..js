import React from "react";

function ViewEmployee(props) {
  // Find employee by ID
  const RemoveEmployee = (empID) => {
    props.RemoveEmployee(empID);
  };

  // Edit employee by ID
  const EditEmployee = (empID) => {
    props.SelectEmployee(empID);
  };

  return (
    <div id="View" className="Tab-content">
      <div>
        <h3>View Employee Information</h3>
      </div>

      <table className="Table-EmployeesData">
        <tbody>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>eMail Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Action</th>
          </tr>

          {/* Displays employee data */}
          {props.EmployeeData.map((empData) => (
            <tr>
              <td>{empData.employeeID}</td>
              <td>{empData.firstName}</td>
              <td>{empData.lastName}</td>
              <td>{empData.eMAilAddress}</td>
              <td>{empData.phoneNumber}</td>
              <td>{empData.position}</td>
              <td>
                <button
                  className="Edit-button"
                  value={empData.employeeID}
                  onClick={() => EditEmployee(empData.employeeID)}
                >
                  Edit
                </button>
                <button
                  className="Delete-button"
                  value={empData.employeeID}
                  onClick={() => RemoveEmployee(empData.employeeID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployee;
