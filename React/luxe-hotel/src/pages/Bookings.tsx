import image from "../assets/bedroom-2.jpg";
import Footer from "../components/Footer";

function Bookings() {
  return (
    <div className="container-fluid">
      <div className="sub-heading d-flex justify-content-center align-items-center gap-2 mt-4">
        <hr className="col-1" />
        <h1 className="display-5 fw-bold text-center mb-4">Make a Booking</h1>
        <hr className="col-1" />
      </div>

      {/* Main Card */}
      <div className="d-flex container-fluid rounded-5 p-1 gap-1 mb-4 text-center">
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-5" alt="..." />
        </div>
        <div className="col align-content-center justify-content-end">
          <div className="card-body">
            <h5 className="card-title">Room 1</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-inline-flex gap-2">
              <button className="btn btn-primary-outline">
                <i className="bi bi-tv"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-fan"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-wifi"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-safe2"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-fire"></i>
              </button>
            </div>
          </div>
          <div className="d-inline-flex gap-2 mt-4">
            <button className="btn btn-primary">
              <i className="bi bi-share"></i>
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-heart-fill"></i>
            </button>
            <button className="btn btn-primary">Reserve Now</button>
          </div>
        </div>
      </div>

      {/* Check Availability */}

      <div className="sub-heading d-flex justify-content-center align-items-center gap-2 mt-4">
        <hr className="col-1" />
        <h1 className="display-5 fw-bold text-center mb-4">
          Confirm Reservation
        </h1>
        <hr className="col-1" />
      </div>
      <div className="d-flex justify-content-center">
        <div className="row gap-2 reservation-form">
          <div className="d-flex">
            <form className="needs-validation">
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Address 2{" "}
                    <span className="text-body-secondary">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label mb-4" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Bookings;
