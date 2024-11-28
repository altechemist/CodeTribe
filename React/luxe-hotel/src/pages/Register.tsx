import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import { register } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2

function Register() {
  // Registration variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | string>("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Validate form validity
    if (!email ||!password) {
      Swal.fire({
        icon: "error",
        title: "Email and password are required",
        text: "Please provide both an email address and a password.",
      });
      return;
    }
    
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password must be at least 8 characters long",
        text: "Please choose a password that is at least 8 characters long.",
      });
      return;
    }

    // Check if the email is provided
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid email address",
        text: "Please provide a valid email address.",
      });
      return;
    }


    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please make sure both passwords match.",
      });
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(String(phoneNumber))) {
      Swal.fire({
        icon: "error",
        title: "Invalid phone number",
        text: "Please provide a valid 10-digit phone number.",
      });
      return;
    }

    setLoading(true);
    await dispatch(register(email, password, name, phoneNumber));

    // Reset loading state after registration
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      Swal.fire({
        icon: "success",
        title: "Successfully registered",
        text: "Welcome to our platform!",
      });
      navigate("/");
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error,
      });
    }
  }, [user, error, navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
            
          <form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={handleSubmit}
          >
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <button className="btn left-icon" type="button">
                <i className="bi bi-lock"></i>
              </button>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn right-icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <div className="input-group mb-3">
              <button className="btn left-icon" type="button">
                <i className="bi bi-lock"></i>
              </button>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirmPasswordInput"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="btn right-icon"
                type="button"
                onClick={toggleConfirmPasswordVisibility}
              >
                <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
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

            {/* Display the loader centered while loading */}
            {loading && (
              <div
                className="d-flex justify-content-center align-items-center mt-3"
                style={{ height: "200px" }} // You can adjust the height as needed
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

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
