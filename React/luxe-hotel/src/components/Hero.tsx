import { Link } from "react-router-dom";

const HeroSection = ({ heading }: {heading: string}) => {
  return (
    <div className="hero-banner py-4">
      <div className="hero-text">
        <h1 className="display-5 fw-bold">{heading}</h1>
        <p className="lead mb-4">
          The perfect place for leisure or business travelers.
        </p>
        
        <Link className="navbar-brand" to="/rooms">
        <button className="btn btn-primary">
          Book Now
        </button>
      </Link>
      </div>
    </div>
  );
};

export default HeroSection;
