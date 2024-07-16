import react from "../assets/react.svg";

export default function Home() {
  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
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
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
