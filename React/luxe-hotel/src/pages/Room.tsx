import React from "react";
import image from "../assets/bedroom-2.jpg";
import Footer from "../components/Footer";

function Room() {
  return (
    <div className="container-fluid">
      <div className="sub-heading d-flex justify-content-center align-items-center gap-2 mt-4">
        <hr className="col-1" />
        <h1 className="display-5 fw-bold text-center mb-4">Room 1</h1>
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

      {/* Gallery */}
      <div className="d-flex container-fluid rounded-5 p-1 gap-1 mb-4 text-center">
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-5" alt="..." />
        </div>
        <div className="col align-content-baseline">
          <div className="d-inline-flex gap-1">
            <img src={image} className="card-img-top rounded-5" alt="..." />
            <img src={image} className="card-img-top rounded-5" alt="..." />
          </div>
          <div className="d-inline-flex gap-1">
            <img src={image} className="card-img-top rounded-5" alt="..." />
            <img src={image} className="card-img-top rounded-5" alt="..." />
          </div>
        </div>
      </div>

      {/* Check Availability */}
      <div className="sub-heading d-flex justify-content-center align-items-center gap-2 mt-4">
        <hr className="col-1" />
        <h1 className="display-5 fw-bold text-center mb-4">
          Check Availability
        </h1>
        <hr className="col-1" />
      </div>

      <div className="d-flex container-fluid row rounded-5 p-1 gap-1 mb-4 align-items-center text-center">
        <div className="col">
          <h4>Available Dates</h4>
          <p>Calendar</p>
          <button className="btn btn-primary">Confirm Reservation</button>
        </div>

        <div className="col">
          <h4>Choose Dates</h4>
          <div className="row gap-2">
            <div className="col mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Check In
              </label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Check Out
              </label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input placeholder"
              />
            </div>
            <div className="d-flex justify-content-center">
            <button className="btn btn-primary">Search</button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Room;
