import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


function Navbar() {
  return (
    <nav className="navbar navbar-expand sticky-top bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand">
        <Link to="/">
          <img className="w-25" src={logo} alt="logo" />
        </Link>
      </a>
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

      <button className="btn btn-lg">
      <i className="bi bi-list"></i>
      </button>

      <div className="nav-links">
        <div
          className="collapse navbar-collapse border justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page">
                <Link to="/">Home</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link to="/gallery">Gallery</Link>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <Link to="/rooms">Rooms</Link>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <Link to="/events">Events</Link>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <Link to="/about">About</Link>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <Link to="/contact">Contact</Link>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <Link to="/profile">
                  <i className="bi bi-person-circle"></i>
                </Link>
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex border justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <Link to="/contact">
                  <i className="bi bi-geo-alt" />
                  {"  "}View Map
                </Link>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <Link to="/profile"><i className="bi bi-telephone" />
                {"  "}+27 53-802-8200</Link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar