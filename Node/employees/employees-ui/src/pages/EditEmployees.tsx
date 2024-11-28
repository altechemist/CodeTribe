import React, { useState, useEffect } from "react";

interface Employee {
  idNumber: string;
  firstName: string;
  lastName: string;
  eMailAddress: string;
  phoneNumber: string;
  position: string;
  image: string; // URL or base64 string
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
  UpdateEmployee: (updatedEmployee: Employee) => Promise<boolean>;
  SelectEmployee: (empID: string) => void;
  errorList: string[];
  isFormValid: boolean | null;
  loading: boolean;
}

const EditEmployees: React.FC<EditEmployeeProps> = (props) => {
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [eMailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load selected employee data into state
  useEffect(() => {
    if (props.SelectedEmployee) {
      setId(props.SelectedEmployee.idNumber || "");
      setFirstName(props.SelectedEmployee.firstName || "");
      setLastName(props.SelectedEmployee.lastName || "");
      setEmailAddress(props.SelectedEmployee.eMailAddress || "");
      setPhoneNumber(props.SelectedEmployee.phoneNumber || "");
      setPosition(props.SelectedEmployee.position || "");
      setImagePreview(props.SelectedEmployee.image || null); // Display existing image
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
    setImagePreview(null);
  };

  // Update employee data
  const UpdateEmployee = async (event: React.FormEvent) => {
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

    if (isFormValid) {
      const employeeDetails: Employee = {
        idNumber: id,
        firstName,
        lastName,
        eMailAddress,
        phoneNumber,
        position,
        image: imagePreview || "",
      };

      const success = await props.UpdateEmployee(employeeDetails);
      if (success) {
        CancelEdit();
        FetchEmployees();
      }
    }
  };

  // Handle file upload and preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG or PNG images are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="Edit" className="container-sm">
      {props?.SelectedEmployee?.id ? (
        <form
          className="EmployeeForm border p-4 my-4 rounded-4 shadow-lg"
          onSubmit={UpdateEmployee}
        >
          <h3>Update Employee Information</h3>
          <p>ID: {props.SelectedEmployee.id}</p>

          {/* Display errors or success messages */}
          {props.errorList.length > 0 ? (
            <div className="mb-3 alert alert-danger">
              <h6>Whoops! There were some problems with your input:</h6>
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
            <label htmlFor="fname" className="form-label">
              Full Names
            </label>
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

          {/* Image Picker */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload Picture
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
          </div>

          <div className="text-end">
            <button className="btn btn-success my-1" type="submit">
              <i className="bi bi-file-arrow-up me-2"></i>
              Update
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>Select an employee to edit</p>
        </div>
      )}
    </div>
  );
};

export default EditEmployees;
