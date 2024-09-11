import logo from "../assets/logo.png";

function ChangePassword() {
  return (
    <div className="container-sm">
      <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-center">
        Change Password
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
            Create a new password
          </h6>
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">

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
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword