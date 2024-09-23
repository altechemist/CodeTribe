import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import ImageGrid from "../components/ImageGrid";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
import { setAdults, setCheckIn, setCheckOut, setChildren, setDuration, setSubtotal } from "../store/slices/bookingSlice";
import RoomSummary from "../components/RoomSummary";

interface Room {
  id: string;
  bed: string;
  size: number;
  amenities: string;
  beds: number;
  description: string;
  guests: number;
  image: string;
  images: string[];
  price: number;
  sofa: string;
  type: string;
}

function Room() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const days = useSelector((state) => state.booking.duration);
  const checkIn = useSelector((state) => state.booking.checkIn);
  const checkOut = useSelector((state) => state.booking.checkOut);
  const adults = useSelector((state) => state.booking.adults);
  const children = useSelector((state) => state.booking.children);
  const room: Room = useSelector((state) => state.db.selectedRoom);

  // Calculate duration
  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const duration = checkOutDate - checkInDate;

      if (!isNaN(duration)) {
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));
        if (days >= 0) {
          dispatch(setDuration(days));
        }
      } else {
        console.log("Invalid date");
      }
    }
  }, [checkIn, checkOut,adults, children]);
 
  const handleView = (room: Room) => {
    // Set the room type in the URL query parameters
    dispatch(setSelectedRoom(room));
    dispatch(setSubtotal((room.price * days).toFixed(2)))
    // Navigate to room details page
    navigate(`/bookings`);
  };

  return (
    <div className="container-fluid">
      <div id="intro">
        <Heading title={room.type} />
      </div>

      {/* Room Card */}
      <RoomSummary />

      {/* Room Images */}
      <ImageGrid />

      {/* Check Availability */}
      <Heading title="Check Availability" />

      <div
        className="d-flex container-fluid row rounded-3 p-1 gap-1 mb-4 align-items-center text-center"
        id="CheckAvailability"
      >
        <div className="col">
          <h3 className="display-7 fw-bold text-center">Available Dates</h3>

          <p>Calendar</p>
          <p>Check In: {checkIn}</p>
          <p>Check Out: {checkOut}</p>
          <p>Duration: {days} Days</p>
          <p>
            <strong>Note:</strong> We are currently unavailable for this room.
            Please try another date.
          </p>
          <button onClick={() => handleView(room)} className="btn btn-primary">
            Confirm Reservation
          </button>
        </div>

        <div className="col">
          <h3 className="display-7 fw-bold text-center">Choose Dates</h3>

          <div className="col gap-2">
            <div className="col mb-3">
              <label htmlFor="checkIn" className="form-label">
                Check In
              </label>
              <input
                type="date"
                className="form-control"
                id="checkIn"
                placeholder="Example input placeholder"
                value={checkIn}
                onChange={(e) => dispatch(setCheckIn(e.target.value))}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="checkOut" className="form-label">
                Check Out
              </label>
              <input
                type="date"
                className="form-control"
                id="checkOut"
                placeholder="Another input placeholder"
                value={checkOut}
                onChange={(e) => dispatch(setCheckOut(e.target.value))}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="checkOut" className="form-label">
                Children
              </label>
              <input
                type="number"
                className="form-control"
                id="children"
                placeholder="0"
                value={children}
                onChange={(e) => dispatch(setChildren(e.target.value))}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="checkOut" className="form-label">
                Adults
              </label>
              <input
                type="number"
                className="form-control"
                id="adults"
                placeholder="0"
                value={adults}
                onChange={(e) => dispatch(setAdults(e.target.value))}
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
