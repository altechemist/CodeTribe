
const HeroSection = ({ heading }: {heading: string}) => {
  return (
    <div className="container-fluid hero-banner rounded-5 py-4">
      <div className="hero-text">
        <h1 className="display-5 fw-bold">{heading}</h1>
        <p className="lead mb-4">
          The perfect place for leisure or business travelers.
        </p>
        <button className="btn btn-primary">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
