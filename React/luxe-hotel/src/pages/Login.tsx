import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  return (
    <div className="container-sm">
      <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-center">
        Welcome Back!
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
            Hey, Good to see you again!
          </h6>
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="input-group mb-3">
              <button className="btn left-icon" type="button">
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


            <div className="input-group mb-1">
              <button className="btn left-icon" type="button">
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

            <Link className="nav-link text-end mb-2" to="/reset-password">
              <small className="text-body-secondary">
                Forgot Password?
              </small>
            </Link>

            <button className="w-100 btn btn-primary" type="submit">
              <i className="bi bi-box-arrow-in-left me-2"></i>
              Login
            </button>

            <hr className="my-4" />

            {/* Social Login */}
            <div className="social-login my-3">
              <h5 className="text-center">Login with</h5>
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

            <Link className="nav-link" to="/register">
              <small className="text-body-secondary">
                Don't have an account? Click here to register
              </small>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
