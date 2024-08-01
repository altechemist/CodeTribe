import React, { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038

type InputValue = string | undefined;

interface LoginProps {
<<<<<<< HEAD
  LoginUser: (email: InputValue, password: InputValue) => Promise<boolean>;
}

const Login: React.FC<LoginProps> = ({ LoginUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorList, setErrorList] = useState<string[]>([]);
  const navigate = useNavigate();
=======
  LoginUser: (
    email: InputValue,
    password: InputValue
  ) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ LoginUser}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorList, setErrorList] = useState<string[]>([]);
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038

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
<<<<<<< HEAD
     
      try {
        // Call the login function
        const success = await LoginUser(email, password) as unknown as boolean;
    
        if (success) {
          // If login was successful, redirect to the tasks page
          navigate("/tasks");
    
          // Clear fields
          setEmail("");
          setPassword("");
          setErrorList([]);
        } else {
          // If login was unsuccessful, set error message
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
  

  const showPassword = () => {
    const passwordInput = document.getElementById(
      "passwordInput"
    ) as HTMLInputElement;
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
=======
      try {
        await LoginUser(email, password); // Call the login function
        setEmail("");
        setPassword("");
        window.location.href = "/tasks"; // Redirect after login
        setErrorList([]);
      } catch (error) {
        setErrorList(["Failed to login. Please check your credentials and try again."]);
      }
    }
  };

  const showPassword = () => {
    const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
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
<<<<<<< HEAD
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
=======
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde praesentium inventore sint fugiat, sunt cumque ab fugit nobis dolorem repudiandae similique voluptate omnis ea illum adipisci corporis corrupti asperiores? Exercitationem!
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
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
<<<<<<< HEAD
                  <input
                    type="checkbox"
                    value="show-password"
                    onClick={showPassword}
                  />{" "}
                  Show Password
=======
                  <input type="checkbox" value="show-password" onClick={showPassword}/> Show Password
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
                </label>
              </div>

              <button className="w-100 btn btn-lg btn-primary" type="submit">
<<<<<<< HEAD
                <i className="bi bi-box-arrow-in-left me-2"></i>
=======
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
                Login
              </button>

              <hr className="my-4" />

<<<<<<< HEAD
              <Link className="nav-link" to="/register">
                <small className="text-body-secondary">
                  Don't have an account? Click here to register
                </small>
              </Link>
=======
              <small className="text-body-secondary">
                Don't have an account? Click here to register
              </small>
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
