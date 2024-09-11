import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Register() {
  return (
    <div className="container-sm">
      <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-center">
        Create Account
      </h1>

      {/* Main Content */}
      <div className="d-flex justify-content-evenly align-items-center mb-3">
        {/* Left Container */}
        <div className="left-container p-1">
          <img src={logo} alt="logo" />
        </div>

        {/* Right Container */}
        <div className="right-container p-2">
          <h6 className="fw-bold text-center my-3">
            Hello, Let's get started!
          </h6>
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div className="input-group mb-3">
              <button
                className="btn left-icon"
                type="button"
              >
                <i className="bi bi-person"></i>
              </button>
              <input
                type="text"
                className="form-control"
                id="fullnamesInput"
                placeholder="Full Names"
                required
              />
            </div>

            <div className="input-group mb-3">
              <button
                className="btn left-icon"
                type="button"
              >
                <i className="bi bi-envelope"></i>
              </button>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="E-mail"
                required
              />
            </div>

            <div className="input-group mb-3">
              <button
                className="btn left-icon"
                type="button"
              >
                <i className="bi bi-hash"></i>
              </button>
              <input
                type="text"
                className="form-control"
                id="phoneInput"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="input-group mb-3">
              <button
                className="btn left-icon"
                type="button"
              >
                <i className="bi bi-lock"></i>
              </button>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                required
              />
              <button className="btn right-icon" type="button">
                <i className="bi bi-eye"></i>
              </button>
            </div>

            <div className="input-group mb-3">
              <button
                className="btn left-icon"
                type="button"
              >
                <i className="bi bi-lock"></i>
              </button>
              <input
                type="password"
                className="form-control"
                id="passwordInput2"
                placeholder="Confirm Password"
                required
              />
              <button className="btn right-icon" type="button">
                <i className="bi bi-eye"></i>
              </button>
            </div>

            <button className="w-100 btn btn-primary" type="submit">
              <i className="bi bi-box-arrow-in-left me-2"></i>
              Register
            </button>

            <hr className="my-4" />

            {/* Social Login */}
            <div className="social-login my-3">
              <h5 className="text-center">Register with</h5>
              <div className="d-flex justify-content-around">
                <button className="btn">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-google"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-twitter-x"></i>
                </button>
              </div>
            </div>

            <Link className="nav-link" to="/login">
              <small className="text-body-secondary">
                Already have an account? Click here to login
              </small>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
