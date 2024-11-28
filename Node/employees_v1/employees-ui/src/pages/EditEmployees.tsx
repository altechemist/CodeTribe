import React, { useState, useEffect } from "react";

interface Employee {
  idNumber: string;
  firstName: string;
  lastName: string;
  eMailAddress: string;
  phoneNumber: string;
  position: string;
  image: File | null;
  id?: string;
}

interface EditEmployeeProps {
  SelectedEmployee: Employee | null;
  FormValidation: (
    idNumber: string,
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    image: File | null
  ) => boolean;
  UpdateEmployee: (
    firstName: string,
    lastName: string,
    eMailAddress: string,
    phoneNumber: string,
    position: string,
    image: File | null,
  ) => Promise<void>;
  errorList: string[];
  isFormValid: boolean | null;
  loading: boolean
}

const EditEmployees: React.FC<EditEmployeeProps> = (props) => {
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [eMailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Handle image files
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the file for upload
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Load selected employee data into state
  useEffect(() => {
    if (props.SelectedEmployee) {
      setId(props.SelectedEmployee.idNumber);
      setFirstName(props.SelectedEmployee.firstName);
      setLastName(props.SelectedEmployee.lastName);
      setEmailAddress(props.SelectedEmployee.eMailAddress);
      setPhoneNumber(props.SelectedEmployee.phoneNumber);
      setPosition(props.SelectedEmployee.position);
    }
  }, [props.SelectedEmployee]);

  // Clear fields after submission
  const CancelEdit = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPhoneNumber("");
    setPosition("");
    setImagePreview("");
    setImageFile(null);
  };

  // Update employee data
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid = props.FormValidation(
      id,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      imageFile
    );

    if (isFormValid) {
     
      try {
        await props.UpdateEmployee(firstName, lastName, eMailAddress, phoneNumber, position, imageFile);
        CancelEdit(); // Clear the form after successful update
      } catch (error) {
        console.error("Error updating employee:", error);
        alert("Failed to update employee. Please try again.");
      }
    }
  };

  if (props?.loading) {
    return (
      <div className="spinner-border text-primary" role="status">
      </div>
    );
  }

  return (
    <div id="Edit" className="container-sm form">
      <form
        className="EmployeeForm border p-4 my-4 rounded-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3>Update Employee Information</h3>

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
              <h6>Employee Successfully Updated!</h6>
            </div>
          )
        )}

        {/* Full Names Input */}
        <div className="mb-3">
          <label className="form-label">Full Names</label>
          <div className="row g-3 align-items-center">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
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
          />
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ width: "100px", height: "100px" }}
          />
        )}

        {/* Submit Button */}
        <div className="text-end">
          <button type="submit" className="btn btn-success my-1">
            <i className="bi bi-file-arrow-up me-2"></i>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployees;
