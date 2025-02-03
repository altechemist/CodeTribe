import React, { useState } from "react";
import Swal from 'sweetalert2'

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [password, setPassword] = useState("");
  const [errorList, setErrorList] = useState([]);

  // Check users from local storage
  const LoginUser = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Check if user exists in local storage
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      const user = users.find((user) => user.email === email);
      if (user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        Swal.fire({
          title: 'Welcome!',
          text: 'Logged in successfully',
          icon: 'success',
          confirmButtonText: 'Continue'
        })
        props.setUser(user);
        props.Home();
      } else {
        setErrorList([
          "Failed to login. Please check your credentials and try again.",
        ]);
      }
    }

    return email === "user@example.com" && password === "password123";
  };

  const passwordReset = async (email) => {
    return email === "user@example.com";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = [];

    if (email === "" || password === "") {
      newErrors.push("Please fill in all fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Please enter a valid email address.");
    }

    setErrorList(newErrors);

    if (newErrors.length === 0) {
      try {
        const success = await LoginUser(email, password);

        if (success) {
          setEmail("");
          setPassword("");
          setErrorList([]);
          alert("Logged in successfully");
        } else {
          setErrorList([
            "Failed to login. Please check your credentials and try again.",
          ]);
        }
      } catch (error) {
        setErrorList([
          "Failed to login. Please check your credentials and try again.",
        ]);
      }
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const newErrors = [];

    if (emailReset === "") {
      newErrors.push("Please fill in all fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailReset)) {
      newErrors.push("Please enter a valid email address.");
    }

    setErrorList(newErrors);

    if (newErrors.length === 0) {
      try {
        const success = await passwordReset(emailReset);

        if (success) {
          setEmailReset("");
          setErrorList([]);
          alert("Email sent, check inbox!");
        } else {
          setErrorList([
            "Failed to reset. Please check your credentials and try again.",
          ]);
        }
      } catch (error) {
        setErrorList([
          "Failed to reset. Please check your credentials and try again.",
        ]);
      }
    }
  };

  const showPassword = () => {
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  };

  return (
    <div>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Welcome Back!
            </h1>
            <p className="col-lg-10 fs-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              praesentium inventore sint fugiat, sunt cumque ab fugit nobis
              dolorem repudiandae similique voluptate omnis ea illum adipisci
              corporis corrupti asperiores? Exercitationem!
            </p>
          </div>
          <div className="col-md mx-auto col-lg">
            <form
              className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
              onSubmit={handleSubmit}
            >
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

              <div className="checkbox mb-3">
                <label>
                  <input
                    type="checkbox"
                    value="show-password"
                    onClick={showPassword}
                  />{" "}
                  Show Password
                </label>
              </div>

              <button className="w-100 btn btn-lg btn-primary" type="submit">
                <i className="bi bi-box-arrow-in-left me-2"></i>
                Login
              </button>

              <div
                className="checkbox mb-3 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#resetModal"
              >
                <label>Forgot Password?</label>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Password Reset Form */}
      <div
        className="modal fade"
        id="resetModal"
        aria-labelledby="resetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title display-6 fw-bold"
                id="resetModalLabel"
              >
                Password Reset
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
              </div>

              <p>We'll send you instructions to reset your password.</p>
              <form
                className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
                onSubmit={handleReset}
              >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailResetInput"
                    placeholder="name@example.com"
                    value={emailReset}
                    onChange={(e) => setEmailReset(e.target.value)}
                    required
                  />
                  <label htmlFor="emailResetInput">Email address</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  <i className="bi bi-box-arrow-in-left me-2"></i>
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
