import { Link } from "react-router-dom";
import react from "../assets/react.svg";

export default function WelcomeHeader() {
  return <div className="px-4 py-5 my-5 text-center">
  <img
    className="d-block mx-auto mb-4"
    src={react}
    alt=""
    width="72"
    height="57"
  />
  <h1 className="display-5 fw-bold text-body-emphasis">Task Master</h1>
  <div className="col-lg-6 mx-auto">
    <p className="lead mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim omnis
      tenetur libero et commodi, optio, incidunt ratione, rerum unde
      officia expedita earum. Sapiente enim fugit id saepe aliquid facere
      ea.
    </p>
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Link className="nav-link" to="/login">
        <button className="btn btn-outline-primary btn-lg px-4 gap-3">
          <i className="bi bi-box-arrow-in-left me-2"></i>
          Login
        </button>
      </Link>

      <Link className="nav-link" to="/register">
        <button className="btn btn-outline-primary btn-lg px-4">
          <i className="bi bi-person-add me-2"></i>
          Register
        </button>
      </Link>
    </div>
  </div>
</div>;
}
