import React, { useState } from "react";

interface Employee {
  employeeID: string;
  firstName: string;
  lastName: string;
  eMailAddress: string;
  phoneNumber: string;
  position: string;
  image: string;
}

interface ViewEmployeeProps {
  EmployeeData: Employee[];
  RemoveEmployee: (empID: string) => void;
  SelectEmployee: (empID: string) => void;
  UpdatePage: () => void;
}

const ViewEmployees: React.FC<ViewEmployeeProps> = (props) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter employees based on the search query
  const filteredEmployees = props.EmployeeData.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Remove employee by ID
  const removeEmployee = (empID: string) => {
    props.RemoveEmployee(empID);
  };

  // Edit employee by ID
  const editEmployee = (empID: string) => {
    props.SelectEmployee(empID);
    props.UpdatePage();
  };

  return (
    <div id="View" className="container-sm">
      <div>
        {props.EmployeeData.length === 0 ? (
          <div className="text-center">
            <h1>No Employee Data Found</h1>
          </div>
        ) : (
          <div>
            {/* Search Employee Section */}
            <div className="EmployeeForm form border rounded-4 p-4 mx-4 my-4 shadow-lg">
              <h3>Search for an Employee</h3>
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="searchID"
                      placeholder="Enter Employee First Name..."
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* View Employee Information Section */}
            <div className="EmployeeForm form border rounded-4 p-4 mx-4 my-4 shadow-lg">
              <h3>View Employee Information</h3>
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((empData) => (
                    <tr key={empData.employeeID} className="align-middle">
                      <td>
                        <img
                          className="Thumbnail"
                          src={empData.image}
                          alt={`${empData.firstName} ${empData.lastName}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
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
                            onClick={() => editEmployee(empData.employeeID)}
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeEmployee(empData.employeeID)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Delete
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
};

export default ViewEmployees;
