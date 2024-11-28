import React, { useState } from "react";

function CreateEmployee(props) {
  // Create state variables for text fields
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [image, uploadImage] = useState(""); // State for image

  // Check if input valid
  const AddEmployee = (event) => {
    // Prevent form submission and page reload
    event.preventDefault();

    const isFormValid = props.FormValidation(
      employeeID,
      firstName,
      lastName,
      eMailAddress,
      phoneNumber,
      position,
      image
    );

    if (isFormValid) {
      props.AddEmployee(
        employeeID,
        firstName,
        lastName,
        eMailAddress,
        phoneNumber,
        position,
        image
      );

      // Clear fields after successful submission
      setEmployeeID("");
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setPhoneNumber("");
      setPosition("");
      uploadImage(""); // Clear the image after submitting
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadImage(reader.result); // Store the image as a base64 data URL
      };
      reader.readAsDataURL(file); // Read the file as a base64-encoded string
    }
  };

  return (
    <div id="Add" className="container-sm form">
      <form
        className="EmployeeForm border p-4 my-4 rounded-4 shadow-lg"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission on Enter press
      >
        <h3>Add Employee Information</h3>

        {/* Display errors */}
        {props.errorList.length > 0 ? (
          <div className="mb-3 alert alert-danger">
            <h6>Whoops! There were some problems with your input</h6>
            <ul>
              {props.errorList.map((errors, index) => (
                <li key={index}>{errors}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {props.isFormValid && (
              <div className="mb-3 alert alert-success">
                <h6>Employee Successfully Created!</h6>
              </div>
            )}
          </div>
        )}

        {/* Employee ID */}
        <div className="mb-3">
          <label htmlFor="empID" className="form-label">
            Employee ID
          </label>
          <div className="row g-3 align-items-center">
            <div className="col-sm">
              <input
                type="text"
                className="form-control"
                id="empID"
                placeholder="101"
                max={13}
                onChange={(event) => setEmployeeID(event.target.value)}
                value={employeeID}
                required
              />
            </div>
          </div>
        </div>

        {/* Full Names */}
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
                id="lname"
                placeholder="Doe"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
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

        {/* Phone Number */}
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

        {/* Position */}
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
          {image && (
            <div className="mt-2">
              <img
                src={image}
                alt="Employee"
                className="img-fluid"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
          )}
        </div>

        <div className="text-end">
          <button
            className="btn btn-primary my-1"
            type="button" // Ensure this is a button, not submit to prevent form submission
            onClick={AddEmployee}
          >
            <i className="bi bi-floppy me-2"></i>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployee;
