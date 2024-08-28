import { useState } from "react";

function Auth() {
  // Define a type for the user
  interface User {
    name: string;
    email: string;
    password: string;
  }

  // State variables for input fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Login in user
  const loginUser = () => {
    // Clear previous error message
    setLoginError("");
    let users: User[] = [];
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        users = JSON.parse(storedUsers) as User[];
      }
    } catch (e) {
      console.error("Failed to parse users from localStorage", e);
      setLoginError("An error occurred while accessing the user data.");
      return;
    }

    // Check if the user exists and the password matches
    if (email === "") {
      setLoginError("Enter an email address");
      return;
    }
    if (!email.includes("@")) {
      setLoginError("Enter a valid email address");
      return;
    }
    if (password === "") {
      setLoginError("Enter your password");
      return;
    }
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Login successful
      console.log("Login successful!");
      setLoginError("");

      // Redirect to another page or handle successful login
    } else {
      // Login failed
      setLoginError("Invalid email or password.");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="authModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="authModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="authModalLabel">
                Please Login...
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                  <div className="mx-auto ">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                      Welcome Back!
                    </h1>
                  </div>

                  <div className="col-md-10 mx-auto ">
                  {loginError && <p style={{ color: "red" }}>{loginError}</p>}
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
                          id="passwordInput"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="passwordInput">Password</label>
                      </div>

                      <hr className="my-4" />

                      <div className="checkbox mb-3">
                        <label>
                          <input type="checkbox" value="show-password" /> Show
                          Password
                        </label>
                      </div>

                      <button
                        onClick={loginUser}
                        type="button"
                        className="btn btn-primary green"
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
    </div>
  );
}

export default Auth;
