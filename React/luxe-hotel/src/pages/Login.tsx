import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";

import { login, facebookLogin, googleLogin, twitterLogin } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Attempt to login
    setLoading(true);
    dispatch(login(email, password));
    setLoading(false);
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    await dispatch(googleLogin());
    setLoading(false);
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    setLoading(true);
    await dispatch(facebookLogin());
    setLoading(false);
  };

  // Handle Twitter login
  const handleTwitterLogin = async () => {
    setLoading(true);
    await dispatch(twitterLogin());
    setLoading(false);
  };

  useEffect(() => {
    // Redirect to home page after successful login
    if (user) {
      // Check if user is admin
      if (user.role === 'admin') {
        navigate("/dashboard");
      } else {
        navigate("/");
      };
    }

    if (error) {
      alert(error);
    }
  }, [user, error, navigate]);

  return (
    <div className="container-sm">
      <Heading title="Welcome Back!" />

      {/* Main Content */}
      <div className="d-flex justify-content-evenly align-items-center mb-3 auth-form">
        {/* Left Container */}
        <div className="left-container p-2 d-flex justify-content-center">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>

        {/* Right Container */}
        <div className="right-container p-2 justify-content-center">
          <h6 className="fw-bold text-center my-3">
            Hey, Good to see you again!
          </h6>
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn right-icon" type="button">
                <i className="bi bi-eye"></i>
              </button>
            </div>

            <Link className="nav-link text-end mb-2" to="/reset-password">
              <small className="text-body-secondary">Forgot Password?</small>
            </Link>

            <button
              className="w-100 btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              <i className="bi bi-box-arrow-in-left me-2"></i>
              Login
            </button>

            <hr className="my-4" />

            {/* Social Login */}
            <div className="social-login my-3">
              <h5 className="text-center">Login with</h5>
              <div className="d-flex justify-content-around">
                <a className="btn" onClick={handleFacebookLogin}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a className="btn" onClick={handleGoogleLogin}>
                  <i className="bi bi-google"></i>
                </a>
                <a className="btn" onClick={handleTwitterLogin}>
                  <i className="bi bi-twitter-x"></i>
                </a>
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
