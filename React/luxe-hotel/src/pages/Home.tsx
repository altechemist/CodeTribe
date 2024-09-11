import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";

function Home() {
  return (
    <div className="container-fluid">
      {/* <!-- Hero Banner --> */}
      <div
        className="container-fluid hero-banner rounded-5 py-4"
        style={{ height: 800 }}
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
        <h1 className="display-5 fw-bold text-center mb-4">Enjoy Your Stay</h1>
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
    </div>
  );
}

export default Home;
