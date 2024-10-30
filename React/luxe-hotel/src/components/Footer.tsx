import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import ReviewForm from "./AddReview";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleProfile = () => {
    // Check if user logged in
    if (user) {
      // Navigate to profile page
      navigate("/profile");
    } else {
      // Navigate to login page
      navigate("/login");
    }
  };

  return (
    <div className="container-xxl mt-4">
      <hr className="mx-auto" />
      <footer className="py-5">
        <div className="row justify-content-between">
          <div className="col-6 col-md-2 mb-3">
            <h5>Luxe Haven</h5>
            <img className="img-fluid" src={logo} alt="Luxe Haven Logo" />
            <div className="social-login nav flex-column">
              <div className="d-flex justify-content-around">
                <Link
                  to="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook" />
                </Link>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter" />
                </Link>
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram" />
                </Link>
                <Link
                  to="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin" />
                </Link>
                <Link to="mailto:example@example.com" aria-label="Email">
                  <i className="bi bi-envelope" />
                </Link>
              </div>
              <div className="d-flex mt-1">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Leave a Review
                </button>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Useful Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-body-secondary">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <Link to="/rooms" className="nav-link p-0 text-body-secondary">
                  Rooms
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/gallery"
                  className="nav-link p-0 text-body-secondary"
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/events" className="nav-link p-0 text-body-secondary">
                  Events
                </Link>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="nav-link p-0 text-body-secondary"
                  onClick={handleProfile}
                >
                  Bookings
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="nav-link p-0 text-body-secondary"
                  onClick={handleProfile}
                >
                  Favorites
                </button>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/contact"
                  className="nav-link p-0 text-body-secondary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <h5>Our Location</h5>
            <p>
              The Kimberley Big Hole, West Circular Road, Kimberley, South
              Africa, 8300
            </p>
            <div className="d-flex flex-column flex-row w-100 gap-2">
              <iframe
                className="img-fluid"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.3552250657453!2d24.75188324732576!3d-28.738809299999986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9b1a560fea20ef%3A0xd4b321df092b543!2sThe%20Big%20Hole%20Museum!5e0!3m2!1sen!2sza!4v1726297440242!5m2!1sen!2sza"
                height="450"
                style={{ border: "0" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© 2024 Company, Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Review Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Submit Feedback
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ReviewForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
