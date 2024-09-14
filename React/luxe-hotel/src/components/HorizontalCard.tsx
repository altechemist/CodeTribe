
import image from "../assets/pool.jpg";

const HorizontalCard = () => {

  return (
    <div className="mb-3 mt-4 hotel">
      <h1 className="display-5 fw-bold text-center mb-4">Enjoy Your Stay</h1>

      <div className="rounded-5 p-3 mb-3 mt-4 slider">
        <div className="row justify-content-between align-items-center my-5">
          <div className="col-1 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-lg text-light"
              aria-label="Previous slide"
            >
              <i className="bi bi-arrow-left-circle"></i>
            </button>
          </div>
          <div className="col-10 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <h5 className="fw-bold text-light fs-1">Swimming Pool</h5>
              <p className="text-light">For breathtaking views, state of the art conferencing facilities</p>
              <img
                className="img-fluid mx-auto d-block rounded-5"
                src={image}
              />
            </div>
          </div>
          <div className="col-1 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-lg text-light"
              aria-label="Next slide"
            >
              <i className="bi bi-arrow-right-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
