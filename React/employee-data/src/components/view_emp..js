import { React, useState } from "react";

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

  // Filter tasks based on the search query
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTasks = props.EmployeeData.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="View" className="container-sm">
      <div>
        {props.EmployeeData.length === 0 ? (
          <div class="text-center">
            <h1>No Employee Data Found</h1>
          </div>
        ) : (
          <div>
            <div className="EmployeeForm form border rounded-4 p-4 mx-4 my-4 shadow-lg">
              <h3>Search for an Employee</h3>
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      id="searchID"
                      placeholder={"Enter Employee Name..."}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="EmployeeForm form border rounded-4 p-4 mx-4 my-4 shadow-lg">
              <h3>View Employee Information</h3>
              <table className="table table-hover table-striped">
                <tbody>
                  <tr>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                    <th>eMail Address</th>
                    <th>Phone Number</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>

                  {/* Displays employee data */}
                  {filteredTasks.map((empData) => (
                    <tr className="align-middle">
                      <td>
                        <img
                          className="Thumbnail"
                          src={empData.image}
                          alt="avatar"
                        />
                      </td>
                      <td>{empData.firstName}</td>
                      <td>{empData.lastName}</td>
                      <td>{empData.employeeID}</td>
                      <td>{empData.eMailAddress}</td>
                      <td>{empData.phoneNumber}</td>
                      <td>{empData.position}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-secondary"
                            value={empData.employeeID}
                            onClick={() => EditEmployee(empData.employeeID)}
                          >
                            <i class="bi bi-pencil me-2"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            value={empData.employeeID}
                            onClick={() => RemoveEmployee(empData.employeeID)}
                          >
                            <i class="bi bi-trash me-2"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewEmployee;
