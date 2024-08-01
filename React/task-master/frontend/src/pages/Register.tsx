import React, { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038

// Define input value type
type InputValue = string | undefined;

// Define props interface for Register component
interface RegisterProps {
  CreateUser: (
    name: InputValue,
    email: InputValue,
    password: InputValue
<<<<<<< HEAD
  ) => Promise<boolean>;
=======
  ) => void;
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
}

// Register component
const Register: React.FC<RegisterProps> = ({ CreateUser }) => {
  // State to hold form inputs
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038

  // State for success message and errors
  const [errorList, setErrorList] = useState<string[]>([]);

  // Function to handle form submission
<<<<<<< HEAD
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
=======
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
    event.preventDefault();
    const newErrors: string[] = [];

    // Validate user input
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      newErrors.push("Please fill in all fields.");
    }

    // Validate user email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Please enter a valid email address.");
    }

    // Check if password matches
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.");
    }

    setErrorList(newErrors);

    // If there are no errors
    if (newErrors.length === 0) {
<<<<<<< HEAD
      
    const success = await CreateUser(name, email, password) as unknown as boolean;
    

    if (success) {
=======
      CreateUser(name, email, password);
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
<<<<<<< HEAD
      setErrorList([]);

      // Redirect to task
      navigate("/tasks");
    } else {
      alert(success)
      setErrorList([
        "Failed to register. Please check your credentials and try again.",
      ]);
    }}
  };

  // Display password in plain text
  const showPassword = () => {
    const passwordInput = document.getElementById(
      "passwordInput"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      "confirmPasswordInput"
    ) as HTMLInputElement;

    if (
      passwordInput.type === "password" &&
      confirmPasswordInput.type === "password"
    ) {
=======

     // Goto tasks
      window.location.href = "/tasks";
      setErrorList([]);
    }
  };

  
  // Display password in plain text
  const showPassword = () => {
    const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPasswordInput") as HTMLInputElement;

    if (passwordInput.type === "password" && confirmPasswordInput.type === "password"){
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
    }
  };

  return (
    <div>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Create an Account
            </h1>
            <p className="col-lg-10 fs-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, aperiam minima perferendis ipsum iusto doloribus sint
              expedita soluta aspernatur dolorem, facere quas doloremque dolores
              aliquam deleniti voluptates suscipit eius quos.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
              onSubmit={handleSubmit}
            >
              {/* Display errors here */}
              <div className="mb-4 m-2">
                {errorList.length > 0 && (
                  <div className="mb-3 alert error-list">
                    <h6>Whoops! There were some problems with your input</h6>
                    <ul className="list-group">
                      {errorList.map((error, index) => (
                        <li key={index} className="error">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Confirmation */}
<<<<<<< HEAD
                {<div></div>}
=======
               {<div></div>}
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="nameInput">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="emailInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="passwordInput">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPasswordInput"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label htmlFor="confirmPasswordInput">Confirm Password</label>
              </div>

              <div className="checkbox mb-3">
                <label>
<<<<<<< HEAD
                  <input
                    type="checkbox"
                    value="show-password"
                    onClick={showPassword}
                  />{" "}
                  Show Password
                </label>
=======
                  <input type="checkbox" value="show-password" onClick={showPassword}/> Show Password
                </label>

>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
              </div>

              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Register
              </button>

              <hr className="my-4" />

<<<<<<< HEAD
              <Link className="nav-link" to="/login">
                <small className="text-body-secondary">
                  Already have an account? Click here to login
                </small>
              </Link>
=======
              <small className="text-body-secondary">
                Already have an account? Click here to login
              </small>
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
