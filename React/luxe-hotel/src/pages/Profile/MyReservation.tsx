import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../../store/slices/dbSlice";

import roomImage from "../../assets/bedroom-2.jpg";
import { useEffect, useState } from "react";
import { fetchReservations } from "../../store/slices/bookingSlice";
import { Spinner } from "react-bootstrap";
import VerticalCard from "../../components/VerticalCard";
import ReservationCard from "../../components/ReservationCard";

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

interface Reservation {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  duration: number;
  guests: number;
  roomType: string;
};


interface CardProps {
  room: Room;
}

const MyReservation: React.FC<CardProps> = () => {
  const dispatch = useDispatch();


  // Get list of reservations
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  const reservationsList = useSelector(
    (state: any) => state.booking.reservations
  );

  // Filter current users reservations
  const user = useSelector((state) => state.auth.user);
  const currentUsersReservations = reservationsList?.filter(
    (reservation) => reservation.email === user?.email
  );


  return (
    <div className="d-flex justify-content-center">
      <div className="container-fluid">
        <div className="col p-2">
          {/* Reservations */}
          <div className="mb-3 mt-4">
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : currentUsersReservations.length > 0 ? (
              <div className="d-flex recommendations">
                {currentUsersReservations.map((reservation: Reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p>No reservations...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyReservation;
