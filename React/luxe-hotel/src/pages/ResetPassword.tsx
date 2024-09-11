import logo from "../assets/logo.png";

function ResetPassword() {
  return (
    <div className="container-sm">
    <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-center">
      Password Reset
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
            />
          </div>


          <button className="w-100 btn btn-primary" type="submit">
            <i className="bi bi-box-arrow-in-left me-2"></i>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword