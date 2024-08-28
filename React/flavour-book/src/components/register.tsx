import { useState } from "react";

function Register() {
  interface User {
    name: string;
    email: string;
    password: string;
  }

  // State variables for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [formError, setFormError] = useState<string>("");

  // Saves to local storage
  const createUser = () => {
    // Get existing users
    let users: User[] = [];
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        users = JSON.parse(storedUsers) as User[];
      }
    } catch (e) {
      console.error("Failed to parse users from local Storage", e);
    }

    // Simple Validation
    if (name === "") {
      setFormError("Enter your name");
      return;
    }
    if (email === "") {
      setFormError("Enter an email address");
      return;
    }
    if (!email.includes("@")) {
      setFormError("Enter a valid email address");
      return;
    }
    if (password === "") {
      setFormError("Enter your password");
      return;
    }
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setFormError("Email address already exists. Please try a different one.");
      return;
    }

    // If everything is valid, save the user to local storage
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save users to localStorage", e);
    }

    // Create a new user object
    const newUser: User = {
      name,
      email,
      password,
    };

    // Add the new user to the list
    users.push(newUser);

    // Save the updated list back to local Storage
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save users to localStorage", e);
    }

    // Clear input fields
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <div>
      <div
        className="modal fade"
        id="registerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="registerModalLabel">
                Create Account...
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
                  <div className="mx-auto">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                      Provide Details
                    </h1>
                  </div>

                  <div className="col-md-10 mx-auto ">
                  {formError && <p style={{ color: "red" }}>{formError}</p>}
                    <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary text-center">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="f-nameInput"
                          placeholder="Jon Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label htmlFor="f-nameInput">Full Names</label>
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
                          id="passwordInput2"
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
                          <input type="checkbox" value="show-password" /> Show
                          Password
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={createUser}
                        className="btn btn-primary green text-centered"
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
    </div>
  );
}

export default Register;
