import React, { useState } from "react";
import logo from "../assets/logo.png";

const ReservationCard = ({ reservation }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleLike = () => setIsLiked(!isLiked);
  const handleShareToggle = () => setIsSharing(!isSharing);

  const {
    checkIn,
    checkOut,
    duration,
    email,
    fullname,
    guests,
    phone,
    roomType,
  } = reservation;

  return (
    <div className="col p-2">
      <div className="card shadow border-3">
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            className="card-img-top img-fluid card-image p-1 rounded-3"
            src={logo}
            alt={`Room type: ${roomType}`}
          />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="px-0 p-0">{roomType}</h4>
            <h4 className="fw-bold px-0 pb-0">{duration} Nights</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <ul className="d-flex list-unstyled mt-auto gap-5">
              <li className="d-flex align-items-center me-1">
                <i className="bi bi-calendar-check me-2"></i>
                <small className="text-nowrap">Check-In: {checkIn}</small>
              </li>
              <li className="d-flex align-items-center me-1">
                <i className="bi bi-calendar-x me-2"></i>
                <small className="text-nowrap">Check-Out: {checkOut}</small>
              </li>
            </ul>
          </div>
          <p className="card-text pt-2">
            <strong>Guest Name:</strong> {fullname}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {phone}
          </p>
          <p className="card-text">
            <strong>Guests:</strong> {guests}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
