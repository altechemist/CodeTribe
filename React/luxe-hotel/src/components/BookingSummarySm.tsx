import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
//import { setSubtotal } from "../store/slices/bookingSlice";


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

export default function BookingSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal: number = useSelector((state) => state.booking.subtotal);
  const room: Room = useSelector((state) => state.db.selectedRoom);
  const duration: number = useSelector((state) => state.booking.duration);
  

  const handleView = (room: Room) => {
    // Set the room type in the URL query parameters
    dispatch(setSelectedRoom(room));
    // Navigate to room details page
    navigate(`/room/${room.id}`);
  };

  return (
    <div>
      {/* Room Card */}
      <div className="d-flex rounded-3 p-1 gap-1 mb-4 text-center justify-content-center room-info ">
        <div className="col-sm align-content-center justify-content-end bg-body-tertiary shadow rounded-4 p-2 pt-3">
          <img
            src={room.image}
            className="w-75 card-img-top img-fluid rounded-3"
            alt="..."
          />
          <div className="card-body">
            <h4 className="fw-bold my-2">{room.type}</h4>
            <p className="card-text">{room.description}</p>
          </div>

          <div className="card-body mt-2">
            <h2>R{room.price}</h2>
            <p className="card-text">x {duration} Days</p>
            <hr></hr>
            <h2 className="fw-bold">R{subtotal}</h2>
          </div>

          <div className="d-inline-flex gap-2 mt-4 mb-2">
            <button
              onClick={() => handleView(room)}
              className="btn btn-primary"
            >
              Edit Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
