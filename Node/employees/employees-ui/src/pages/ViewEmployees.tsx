import React, { useState } from "react";

interface Employee {
  idNumber: string;
  firstName: string;
  lastName: string;
  eMailAddress: string;
  phoneNumber: string;
  position: string;
  image: string;
  id?: string;
}

interface ViewEmployeeProps {
  EmployeeData: Employee[];
  RemoveEmployee: (id: string) => void;
  SelectEmployee: (id: string) => void;
  UpdatePage: () => void;
  loading: boolean;
}

const ViewEmployees: React.FC<ViewEmployeeProps> = (props) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter employees based on the search query
  const filteredEmployees = props.EmployeeData.filter((employee) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      searchQuery &&
      (employee.firstName.toLowerCase() === lowerCaseSearchQuery ||
        employee.lastName.toLowerCase() === lowerCaseSearchQuery)
    );
  });

  // Remove employee by ID
  const removeEmployee = (id: string) => {
    props.RemoveEmployee(id);
  };

  // Edit employee by ID
  const editEmployee = (id: string) => {
    props.SelectEmployee(id);
    props.UpdatePage();
  };

  // Handle loading
  if (props?.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
        </div>
      </div>
    );
  }

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
                  {(filteredEmployees.length > 0
                    ? filteredEmployees
                    : props.EmployeeData
                  ).map((empData) => (
                    <tr key={empData.id} className="align-middle">
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
                      <td>{empData.idNumber}</td>
                      <td>{empData.eMailAddress}</td>
                      <td>{empData.phoneNumber}</td>
                      <td>{empData.position}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-secondary"
                            onClick={() => editEmployee(empData.id)}
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeEmployee(empData.id)}
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
