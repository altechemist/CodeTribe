import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import { register } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  // Registration variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    dispatch(register(email, password));

    // Reset loading state after registration
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      alert("Successfully registered");
      navigate("/");
    }

    if (error) {
      alert(error); // Display error message to the user
    }
  }, [user, error, navigate]);

  return (
    <div className="container-sm">
      <Heading title="Create Account" />

      <div className="d-flex justify-content-evenly align-items-center mb-3 auth-form">
        <div className="left-container p-2 d-flex justify-content-center">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>

        <div className="right-container p-2">
          <h6 className="fw-bold text-center my-3">
            Hello, Let's get started!
          </h6>
          <form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <div className="input-group mb-3">
              <button className="btn left-icon" type="button">
                <i className="bi bi-person"></i>
              </button>
              <input
                type="text"
                className="form-control"
                id="NamesInput"
                placeholder="Full Names"
                required
              />
            </div>

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

            <div className="input-group mb-3">
              <button className="btn left-icon" type="button">
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

            <div className="input-group mb-3">
              <button className="btn left-icon" type="button">
                <i className="bi bi-lock"></i>
              </button>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordInput"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn right-icon" type="button">
                <i className="bi bi-eye"></i>
              </button>
            </div>

            <button
              className="w-100 btn btn-primary"
              type="submit"
              disabled={loading}
            >
              <i className="bi bi-box-arrow-in-left me-2"></i>
              {loading ? "Registering..." : "Register"}
            </button>

            {loading && <h1>Loading</h1>}

            <hr className="my-4" />

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
