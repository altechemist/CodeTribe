import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";

import logo from "../assets/logo.png";

function Home() {
  return (
    <div className="container-fluid">
      {/* <!-- Hero Banner --> */}
      <div
        className="container-fluid hero-banner rounded-5 py-4"
      >
        <div className="hero-text">
          <h1 className="display-5 fw-bold">Welcome to Luxe Hotel</h1>
          <p className="lead mb-4">
            The perfect place for leisure or business travelers.
          </p>
        </div>
      </div>

      {/* <!-- Carousel --> */}
      <div className="mb-3 mt-4">
        <HorizontalCard />
      </div>

      {/* <!-- Recommendation --> */}
      <div className="mb-3 mt-4">
        <h1 className="display-5 fw-bold text-center mb-4">Rooms & Suites</h1>
        <div className="d-flex recommendations">
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
        </div>
      </div>

      {/* <!-- Hotel Information --> */}
      <div className="mb-3 mt-4 ">
        <h1 className="display-5 fw-bold text-center mb-4">
          Hotel Information
        </h1>
        <div className="row justify-content-evenly align-items-center">
          <div className="col-4">
            {" "}
            <div className="img-fluid">
              <img className="img-fluid" src={logo} alt={logo} />
            </div>
          </div>
          <div className="col-4">
            <ul className="text-dark text-center">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
              <li>Item 5</li>
              <li>Item 6</li>
              <li>Item 7</li>
              <li>Item 8</li>
              <li>Item 9</li>
              <li>Item 10</li>
              <li>Item 11</li>
              <li>Item 12</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!-- Frequently Asked Questions --> */}
      <div className="mb-3 mt-4 align-items-end">
        <h1 className="display-5 fw-bold text-center mb-4">
          Frequently Asked Questions
        </h1>
        <div className=" d-flex justify-content-center">
          <div className="accordion col-sm-7" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Accordion Item #4
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Accordion Item #5
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex mb-3 mt-4">
        <footer className="text-dark py-3 d-flex justify-content-between mx-auto">
          <div className="about-us col-3 justify-content-center border p-2">
            <h4>Luxe Haven</h4>
            <img className="img-fluid" src={logo} alt={logo} />
            <p>Best hotel</p>
            <div className="social-login">
              <div className="d-flex justify-content-around">
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="useful-links p-2 border">
            <h4>Useful Links</h4>
            <div>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Rooms</a>
                </li>
                <li>
                  <a href="">Gallery</a>
                </li>
                <li>
                  <a href="">Events</a>
                </li>
                <li>
                  <a href="">Bookings</a>
                </li>
                <li>
                  <a href="">My Favorites</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="our-location p-2 border">
            <h4 className="text-wrap">Our Location</h4>
            <p>
              The Kimberley Big Hole, West Circular Road, Kimberley, South
              Africa, 8300
            </p>
            <div>
              <img className="img-fluid" src={logo} alt="map" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
