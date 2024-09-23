import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="img-fluid w-25" src={logo} alt="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse row align-content-center" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0 justify-content-end">
            <li className="nav-item">
              <Link className="nav-link active" to="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <div className="dropdown">
            <a
              href="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="Profile"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <Link className="dropdown-item" to="#">
                  My Bookings...
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Favorites
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>

          </ul>
         
          
          <div className="d-flex align-items-center justify-content-end ">
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="bi bi-geo-alt"></i> View Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="bi bi-telephone"></i> +27 53-802-8200
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
