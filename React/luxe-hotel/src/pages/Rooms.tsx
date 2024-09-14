
import HeroSection from "../components/Hero";
import Footer from "../components/Footer";
import image from "../assets/bedroom.jpg";

function Rooms() {
  return (
    <div className="container-fluid">
      <div className="">
        <HeroSection heading="Discover Our Rooms & Suites"/>
      </div>

      {/* Rooms */}
      <div className="text-center">
        <div className="sub-heading d-flex justify-content-center align-items-center gap-2 mt-4">
          <hr className="col-1" />
          <h1 className="display-5 fw-bold text-center mb-4">Rooms & Suites</h1>
          <hr className="col-1" />
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
          reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
          eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
          inventore earum!
        </p>

        <div>
          {/* Room Cards */}
          <div className="">
            {/* Card 1 */}
            <div className="d-flex container-fluid rounded-5 p-1 gap-1 mb-4">
              <div className="d-flex img-fluid w-25 col">
                <img src={image} className="card-img-top rounded-5" alt="..." />
              </div>
              <div className="col align-content-center justify-content-end">
                <div className="card-body">
                  <h5 className="card-title">Room 1</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="d-flex container-fluid rounded-5 p-1 gap-1">
              <div className="col align-content-center justify-content-end">
                <div className="card-body">
                  <h5 className="card-title">Room 2</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
              <div className="d-flex img-fluid w-25 col">
                <img src={image} className="card-img-top rounded-5" alt="..." />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="d-flex mb-3 mt-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
