import React from "react";

function ViewEmployee(props) {
  // Find employee by ID
  const RemoveEmployee = (empID) => {
    props.RemoveEmployee(empID);
  };

  // Edit employee by ID
  const EditEmployee = (empID) => {
    props.SelectEmployee(empID);

    // Change to update tab
    props.UpdatePage();
  };

  return (
    <div id="View" className="container-sm">
      <div>
        <h3>View Employee Information</h3>
      </div>

      <table className="table table-hover table-striped">
        <tbody>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>eMail Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>

          {/* Displays employee data */}
          {props.EmployeeData.map((empData) => (
            <tr>
              <td>{empData.employeeID}</td>
              <td>{empData.firstName}</td>
              <td>{empData.lastName}</td>
              <td>{empData.eMailAddress}</td>
              <td>{empData.phoneNumber}</td>
              <td>{empData.position}</td>
              <td>
                {empData.image}
                <img className="Thumbnail" src={empData.image} alt="avatar" />
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-secondary"
                    value={empData.employeeID}
                    onClick={() => EditEmployee(empData.employeeID)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    value={empData.employeeID}
                    onClick={() => RemoveEmployee(empData.employeeID)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployee;
