import logo from "../assets/logo.png";
import Heading from "../components/Heading";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../store/slices/authSlice';
import { useDispatch } from "react-redux";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Reset email address
    dispatch(resetPassword(email));

    // Redirect to login page after successful reset
    navigate("/login");
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
