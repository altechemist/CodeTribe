import logo from "../assets/logo.png";
import Heading from "../components/Heading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2

function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email) {
      // Check if the email is provided
      Swal.fire({
        icon: "error",
        title: "Email is required",
        text: "Please provide a valid email address.",
      });
      return;
    }

    try {
      // Dispatch resetPassword action
      await dispatch(resetPassword(email));

      // Display success alert
      Swal.fire({
        icon: "success",
        title: "Password Reset Requested",
        text: "Check your email for reset instructions.",
      });

      // Redirect to login page after success
      navigate("/login");
    } catch (error) {
      // Display error alert if something goes wrong
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "There was an issue with the password reset. Please try again later.",
      });
    }
  };

  return (
    <div className="container-sm">
      <Heading title="Password Reset" />

      {/* Main Content */}
      <div className="d-flex justify-content-evenly align-items-center mb-3 auth-form">
        {/* Left Container */}
        <div className="left-container p-2 d-flex justify-content-center">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>

        {/* Right Container */}
        <div className="right-container img-fluid">
          <h6 className="fw-bold text-center my-3">
            We'll send you instructions to reset your password.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="w-100 btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              <i className="bi bi-box-arrow-in-left me-2"></i>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
