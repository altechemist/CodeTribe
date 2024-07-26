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

  const HasData = () => {
    if (props.EmployeeData.length !== 0) return true;
  };

  return (
    <div id="View" className="container-sm">
      <div>
        {props.EmployeeData.length === 0 ? <div class="text-center"><h1>No Employee Data Found</h1></div> : <div>
        <h3>View Employee Information</h3>

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
                    <i class="bi bi-pencil me-2"></i>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    value={empData.employeeID}
                    onClick={() => RemoveEmployee(empData.employeeID)}
                  >
                    <i class="bi bi-trash me-2"></i>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>}
      </div>
      
    </div>
  );
}

export default ViewEmployee;
