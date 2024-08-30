import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  const logout = () => {
    window.location.href = "/tasks";
  };
  return (
    <>
      <div className="container-sm">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <i className="bi bi-house-fill me-2"></i>
            <span className="fs-4">Task Master</span>
          </a>

          <ul className="nav align-items-between">
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                <button className="btn btn-outline-primary me-2">
                  <i className="bi bi-list-task me-2"></i>
                  Tasks
                </button>
              </Link>
            </li>
            <div className="d-flex justify-content-end" id="auth-div">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <button className="btn btn-outline-primary me-2">
                  <i className="bi bi-box-arrow-in-left me-2"></i>
                  Login
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <button className="btn btn-outline-primary me-2">
                  <i className="bi bi-person-add me-2"></i>
                  Register
                </button>
              </Link>
            </li>
            </div>
            <li className="nav-item hidden" id="logout-button">
              <Link className="nav-link" to="">
                <button className="btn btn-outline-primary me-2" onClick={logout}>
                  <i className="bi bi-box-arrow-in-left me-2"></i>
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </header>
      </div>
      <Outlet />
    </>
  );
}
