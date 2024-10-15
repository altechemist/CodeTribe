import React, { useState, useEffect } from "react";

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

interface EditEmployeeProps {
  EmployeeData: Employee[];
  SelectedEmployee: Employee | null;
  FormValidation: (
    id: string,
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    image: File | null
  ) => boolean;
  UpdateEmployee: (
    updatedEmployee: Employee
  ) => Promise<boolean>;
  
  SelectEmployee: (empID: string) => void;
  errorList: string[];
  isFormValid: boolean | null;
}

const EditEmployees: React.FC<EditEmployeeProps> = (props) => {
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [eMailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // Load selected employee data into state
  useEffect(() => {
    if (props.SelectedEmployee) {
     
      setFirstName(props.SelectedEmployee.firstName);
      setLastName(props.SelectedEmployee.lastName);
      setEmailAddress(props.SelectedEmployee.eMailAddress);
      setPhoneNumber(props.SelectedEmployee.phoneNumber);
      setPosition(props.SelectedEmployee.position);
      // Handle image loading if necessary
    }
  }, [props.SelectedEmployee]);

  // Cancel edit and clear form
  const CancelEdit = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPhoneNumber("");
    setPosition("");
    setImage(null);
  };

  // Update employee data
  const UpdateEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    
    const isFormValid = props.FormValidation(
      id,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      image
    );

    const employeeDetails = {
      idNumber: id,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      image};
      
    // Update employee data in the database
    if (isFormValid) {
      props.UpdateEmployee(
        employeeDetails
      );

      // Clear fields after submission
      CancelEdit();
    }
  };

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
  };

  return (
    <div id="Edit" className="container-sm">
      
      <form
        className="EmployeeForm border p-4 my-4 rounded-4 shadow-lg"
        onSubmit={UpdateEmployee}
      >
        <h3>Update Employee Information</h3>
        <p>{props.SelectedEmployee.id}</p>

        {/* Display errors or success messages */}
        {props.errorList.length > 0 ? (
          <div className="mb-3 alert alert-danger">
            <h6>Whoops! There were some problems with your input</h6>
            <ul>
              {props.errorList.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : props.isFormValid ? (
          <div className="mb-3 alert alert-success">
            <h6>Employee Info Successfully Updated!</h6>
          </div>
        ) : null}

        {/* Full Names Input */}
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">Full Names</label>
          <div className="row g-3 align-items-center">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Last Name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
        </div>

        {/* Email Address Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={(event) => setEmailAddress(event.target.value)}
            value={eMailAddress}
            required
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="0612345678"
            onChange={(event) => setPhoneNumber(event.target.value)}
            value={phoneNumber}
            required
          />
        </div>

        {/* Position Input */}
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            placeholder="Developer"
            onChange={(event) => setPosition(event.target.value)}
            value={position}
            required
          />
        </div>

        {/* Image Picker */}
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload picture</label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
          />
        </div>

        <div className="text-end">
          <button className="btn btn-success my-1" type="submit">
            <i className="bi bi-file-arrow-up me-2"></i>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployees;
