
const HeroSection = ({ heading }: {heading: string}) => {
  return (
    <div className="hero-banner py-4">
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
