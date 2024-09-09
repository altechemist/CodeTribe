import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearRegisterError } from "../redux/usersReducer";

function Register() {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.users.registerError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleRegister = () => {
    dispatch(clearRegisterError());
    dispatch(registerUser({ name, email, password, password2 }));

    if (registerError === "") {
      // Show success message
      setFormSuccess("Registration successful!");

      // Clear form after 1 second
      setTimeout(() => {
        setFormSuccess("");

        // Find button by id
        const button = document.getElementById("closeRegistrationModal");
        button.click();
      }, 1000);
    }
  };

  // Show password
  const showPassword = () => {
    document.getElementById("password1").type = document.getElementById("password1").type === "password"? "text" : "password";
    document.getElementById("password2").type = document.getElementById("password2").type === "password"? "text" : "password";
  };


  return (
    <div
      className="modal fade"
      id="registerModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="registerModalLabel">
              Create Account
            </h1>
            <button
              type="button"
              className="btn-close"
              id="closeRegistrationModal"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
              <div className="row align-items-center g-lg-5 py-5">
                <div className="mx-auto">
                  <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                    Provide Details
                  </h1>
                </div>
                <div className="col-md-10 mx-auto">
                  <div>
                    {registerError && (
                      <p className="text-danger mt-2">{registerError}</p>
                    )}
                    {formSuccess && (
                      <p className="text-success mt-2">{formSuccess}</p>
                    )}
                  </div>
                  <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary text-center">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        placeholder="Jon Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label htmlFor="nameInput">Full Names</label>
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
                        id="password1"
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
                        id="password2"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                      />
                      <label htmlFor="passwordInput2">Confirm Password</label>
                    </div>
                    <hr className="my-4" />
                    <div className="checkbox mb-3">
                      <label>
                        <input type="checkbox" value="show-password" onChange={showPassword} /> Show
                        Password
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-box-arrow-in-left me-2"></i>
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
