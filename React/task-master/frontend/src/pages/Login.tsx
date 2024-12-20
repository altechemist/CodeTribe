import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type InputValue = string | undefined;

interface LoginProps {
  LoginUser: (email: InputValue, password: InputValue) => Promise<boolean>;
}

const Login: React.FC<LoginProps> = ({ LoginUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorList, setErrorList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: string[] = [];

    if (email === "" || password === "") {
      newErrors.push("Please fill in all fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Please enter a valid email address.");
    }

    setErrorList(newErrors);

 
    if (newErrors.length === 0) {
      setLoading(true);
      try {
        // Call the login function
        const success = (await LoginUser(
          email,
          password
        )) as unknown as boolean;

        if (success) {
          // If login was successful, redirect to the tasks page
          navigate("/tasks");

          // Clear fields
          setEmail("");
          setPassword("");
          setErrorList([]);
        } 
      } catch (error) {
        setErrorList([
          "Failed to login. Please check your credentials and try again.",
        ]);
        console.log("login", error);
      }
      setLoading(false);
    }
    
  };

  const showPassword = () => {
    const passwordInput = document.getElementById(
      "passwordInput"
    ) as HTMLInputElement;
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
          <div className="col-md-10 mx-auto col-lg-5">
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
                {loading && (
                  <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
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

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={loading}
              >
                <i className="bi bi-box-arrow-in-left me-2"></i>
                Login
              </button>

              <hr className="my-4" />

              <Link className="nav-link" to="/register">
                <small className="text-body-secondary">
                  Don't have an account? Click here to register
                </small>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
