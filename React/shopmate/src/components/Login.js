import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearLoginError, getUsers } from "../redux/usersReducer";

function Login() {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.users.loginError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(clearLoginError());
    dispatch(loginUser({ email, password }));

    alert(loginError)
    if (loginError === "") {
      // Show success message
      setFormSuccess("Login successful!");

      // Clear form after 1 second
      setTimeout(() => {
        setFormSuccess("");

        // Find button by id
        const button = document.getElementById("closeLoginModal");
        button.click();
      }, 1000);
    }
  };

  // Show password
  const showPassword = () => {
    document.getElementById("password").type =
      document.getElementById("password").type === "password"
        ? "text"
        : "password";
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="loginModalLabel">
              Please Login
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="closeLoginModal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
              <div className="row align-items-center g-lg-5 py-5">
                <div className="mx-auto">
                  <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                    Welcome Back!
                  </h1>
                </div>
                <div className="col-md-10 mx-auto">
                  <div>
                    {loginError && (
                      <p className="text-danger mt-2">{loginError}</p>
                    )}
                    {formSuccess && (
                      <p className="text-success mt-2">{formSuccess}</p>
                    )}
                  </div>

                  <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
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
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password2">Password</label>
                    </div>
                    <hr className="my-4" />
                    <div className="checkbox mb-3">
                      <label>
                        <input
                          type="checkbox"
                          value="show-password"
                          onChange={showPassword}
                        />{" "}
                        Show Password
                      </label>
                    </div>
                    <button
                      onClick={handleLogin}
                      type="button"
                      className="btn btn-primary"
                    >
                      <i className="bi bi-box-arrow-in-left me-2"></i>
                      Login
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

export default Login;
