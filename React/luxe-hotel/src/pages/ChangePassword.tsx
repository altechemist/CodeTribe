import logo from "../assets/logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import Heading from "../components/Heading";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = auth.currentUser;
    const newPassword = password;

    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
          alert("Password updated successfully!");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode);
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <div className="container-sm">
      <Heading title="Change Password" />

      {/* Main Content */}
      <div className="d-flex justify-content-evenly align-items-center mb-3 auth-form">
        {/* Left Container */}
        <div className="left-container p-2 d-flex justify-content-center">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>

        {/* Right Container */}
        <div className="right-container p-2">
          <h6 className="fw-bold text-center my-3">Create a new password</h6>
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
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
                id="passwordInput2"
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
              onClick={handleSubmit}
            >
              <i className="bi bi-box-arrow-in-left me-2"></i>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
