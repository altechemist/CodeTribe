import image from "../assets/pool.jpg";
function HorizontalCard() {
  return (
    <div className="mb-3 mt-4 hotel">
      <h1 className="display-5 fw-bold text-center mb-4">Enjoy Your Stay</h1>

      <div className="rounded-5 p-3 mb-3 mt-4 slider">
        <div className="row justify-content-between align-items-center my-5">
          <div className="col-1">
            <button className="btn btn-lg text-light">
              <i className="bi bi-arrow-left-circle"></i>
            </button>
          </div>
          <div className=" d-flex col justify-content-center align-items-center">
            <div className="col-4">
              <h5 className="fw-bold text-light text-center fs-1">Swimming Pool</h5>
              <p className="text-center text-light">
                For breathtaking views, state of the art conferencing facilities
              </p>
            </div>
            <div className="col-4">
              <img
                className="img-fluid mx-auto d-block rounded-5"
                src={image}
                alt="Pool"
              />
            </div>
          </div>
          <div className="col-1 text-end">
            <button className="btn btn-lg text-light">
              <i className="bi bi-arrow-right-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
