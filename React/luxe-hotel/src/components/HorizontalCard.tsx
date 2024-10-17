import { useState, useEffect } from "react";

import pool from "../assets/pineapple.jpg";
import gym from "../assets/gym-interior.jpg";
import conference from "../assets/event-room.jpg";
import Heading from "./Heading";

type Amenity = {
  title: string;
  description: string;
  image: string;
};

const amenities: Record<string, Amenity> = {
  pool: {
    title: "Swimming Pool",
    description:
      "For breathtaking views, state-of-the-art conferencing facilities",
    image: pool,
  },
  gym: {
    title: "Fitness Center",
    description: "Intimate fitness center with state-of-the-art equipment",
    image: gym,
  },
  conference: {
    title: "Conference Rooms",
    description: "Private event space with state-of-the-art facilities",
    image: conference,
  },
};

const HorizontalCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const amenityKeys = Object.keys(amenities);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % amenityKeys.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + amenityKeys.length) % amenityKeys.length
    );
  };

  const currentAmenity = amenities[amenityKeys[currentIndex]];

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="mb-3 mt-4 hotel">
      <Heading title="Our Amenities"/>
      <div className="rounded-5 p-3 mb-3 mt-4 slider position-relative">
        <div className="d-flex justify-content-center align-items-center">
          <img
            className="img-fluid d-block rounded-5 shadow"
            src={currentAmenity.image}
            alt={currentAmenity.title}
            style={{ width: '80rem', height: '40rem', objectFit: 'cover' }}
          />
          <div className="text-center position-absolute top-50 start-50 translate-middle text-white" style={{ zIndex: 1 }}>
            <h5 className="fw-bold fs-1">{currentAmenity.title}</h5>
            <p>{currentAmenity.description}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-lg"
            onClick={handlePrevious}
            aria-label="Previous slide"
          >
            <i className="bi bi-arrow-left-circle"></i>
          </button>
          <button
            className="btn btn-lg"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
