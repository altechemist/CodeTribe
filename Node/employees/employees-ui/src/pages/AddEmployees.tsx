import React, { useState } from "react";

interface CreateEmployeeProps {
  AddEmployee: (
    employeeID: string,
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    image: string
  ) => void;
  FormValidation: (
    employeeID: string,
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    image: string
  ) => boolean;
  errorList: string[];
  isFormValid: boolean | null;
}

const AddEmployees: React.FC<CreateEmployeeProps> = (props) => {
  const [employeeID, setemployeeID] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [eMailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    const isFormValid = props.FormValidation(
      employeeID,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      imagePreview
    );

    if (isFormValid) {
      props.AddEmployee(
        employeeID,
        firstName,
        lastName,
        eMailAddress,
        phoneNumber,
        position,
        imagePreview
      );

      // Clear fields after submission
      setemployeeID("");
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setPhoneNumber("");
      setPosition("");
      setImagePreview("");
    }
  };

  return (
    <div id="Add" className="container-sm form">
      <form
        className="EmployeeForm border p-4 my-4 rounded-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3>Add Employee Information</h3>

        {/* Display error or success messages */}
        {props.errorList.length > 0 ? (
          <div className="mb-3 alert alert-danger">
            <h6>Whoops! There were some problems with your input</h6>
            <ul>
              {props.errorList.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : (
          props.isFormValid && (
            <div className="mb-3 alert alert-success">
              <h6>Employee Successfully Created!</h6>
            </div>
          )
        )}

        {/* Employee ID Input */}
        <div className="mb-3">
          <label htmlFor="empID" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empID"
            placeholder="101"
            onChange={(event) => setemployeeID(event.target.value)}
            value={employeeID}
            required
          />
        </div>

        {/* Full Names Input */}
        <div className="mb-3">
          <label className="form-label">Full Names</label>
          <div className="row g-3 align-items-center">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="Jon"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="Doe"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
        </div>

        {/* Email Address Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
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
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
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
          <label htmlFor="position" className="form-label">
            Position
          </label>
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

        {/* Image Upload Input */}
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload picture
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-end">
          <button type="submit" className="btn btn-primary my-1">
            <i className="bi bi-floppy me-2"></i>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployees;
