import image from "../assets/pool.jpg";
import Heading from "./Heading";

const HorizontalCard = () => {
  return (
    <div className="mb-3 mt-4 hotel">
      <Heading title="Enjoy Your Stay" />

      <div className="rounded-5 p-3 mb-3 mt-4 slider">
        <div className="row justify-content-between align-items-center my-5">
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-center">
              <h5 className="fw-bold fs-1">Swimming Pool</h5>
              <p className="">
                For breathtaking views, state of the art conferencing facilities
              </p>
              <div className="d-flex justify-content-center">
                <img className="img-fluid d-block rounded-5 h-50" src={image} />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-lg" aria-label="Previous slide">
              <i className="bi bi-arrow-left-circle"></i>
            </button>
            <button className="btn btn-lg" aria-label="Previous slide">
              <i className="bi bi-arrow-right-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
