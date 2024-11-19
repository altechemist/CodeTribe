import { useEffect } from "react";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import ImageGrid from "../components/ImageGrid";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
import {
  setAdults,
  setCheckIn,
  setCheckOut,
  setChildren,
  setDuration,
  setGuests,
  setSubtotal,
} from "../store/slices/bookingSlice";
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
  bookedRooms: number;
  totalRooms: number;
}

function Room() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const days = useSelector((state) => state.booking.duration);
  const checkIn = useSelector((state) => state.booking.checkIn);
  const checkOut = useSelector((state) => state.booking.checkOut);
  const adults = useSelector((state) => state.booking.adults);
  const children = useSelector((state) => state.booking.children);
  const guests = useSelector((state) => state.booking.guests);
  const room: Room = useSelector((state) => state.db.selectedRoom);

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
      }
    }

    if (adults >= 0 && children >= 0) {
      dispatch(setGuests(parseInt(adults) + parseInt(children)));
    }
  }, [checkIn, checkOut, adults, children]);

  const handleView = (room: Room) => {
    

    // Check reservation details
    if (days === 0 || guests === 0 ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid selection",
        text: "Please select at least one day and one guest(s).",
        confirmButtonColor: '#2c2c2c',
        confirmButtonText: "OK",
      });
      return;
    }

    if (availableUnits === 0 ) {
      Swal.fire({
        icon: "warning",
        title: "Room unavailable",
        text: "Oops, the current room is unavailable",
        confirmButtonText: "OK",
      });
      return;
    }

    dispatch(setSelectedRoom(room));
    dispatch(setSubtotal((room.price * days).toFixed(2)));

    navigate(`/bookings`);
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    dispatch(setCheckIn(selectedDate));

    // If check-out is before check-in, reset it
    if (checkOut && new Date(selectedDate) > new Date(checkOut)) {
      dispatch(setCheckOut("")); // Reset check-out date
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    dispatch(setCheckOut(selectedDate));
  };

  // Find number of available units
  let availableUnits: number = 0;
  if (room) availableUnits = room.totalRooms - room.bookedRooms;

  return (
    <div className="container-fluid mt-4">
      <RoomSummary />
      <ImageGrid />

      <Heading title="Check Availability" />

      <div
        className="d-flex flex-row align-items-center justify-content-evenly mb-4"
        id="CheckAvailability"
      >
        <div className="col-4 text-center mb-4">
          <h3 className="display-7 fw-bold">Choose Dates</h3>
          <div className="row g-3 mb-3 justify-content-center">
            <div className="col-md-6">
              <label htmlFor="checkIn" className="form-label">
                Check In
              </label>
              <input
                type="date"
                className="form-control"
                id="checkIn"
                value={checkIn}
                onChange={handleCheckInChange}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="checkOut" className="form-label">
                Check Out
              </label>
              <input
                type="date"
                className="form-control"
                id="checkOut"
                value={checkOut}
                onChange={handleCheckOutChange}
                min={
                  checkIn
                    ? new Date(checkIn).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                } // Disable past and invalid dates
              />
            </div>
          </div>

          <div className="row g-3 mb-3 justify-content-center">
            <div className="col-md-6">
              <label htmlFor="children" className="form-label">
                Children
              </label>
              <input
                type="number"
                className="form-control"
                id="children"
                placeholder="0"
                value={children}
                min={0}
                max={room.guests}
                onChange={(e) => dispatch(setChildren(e.target.value))}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="adults" className="form-label">
                Adults
              </label>
              <input
                type="number"
                className="form-control"
                id="adults"
                placeholder="0"
                min={0}
                max={room.guests}
                value={adults}
                onChange={(e) => dispatch(setAdults(e.target.value))}
              />
            </div>
          </div>

          <div className="alert alert-secondary mt-2 mb-2 " role="alert">
            Available Units: <strong>{availableUnits}</strong>
          </div>

          <button onClick={() => handleView(room)} className="btn btn-primary">
            Confirm Reservation
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Room;
