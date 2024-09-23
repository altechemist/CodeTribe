import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";

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

export default function RoomInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const room: Room = useSelector((state) => state.db.selectedRoom);
  
  const handleView = (room: Room) => {
    // Set the room type in the URL query parameters
    dispatch(setSelectedRoom(room));
    // Navigate to room details page
    navigate(`/bookings`);
  }

  return (
    <div>
      {/* Room Card */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4 text-center room-info">
        <div className="d-flex img-fluid col">
          <img
            src={room.image}
            className="card-img-top img-fluid rounded-3"
            alt="..."
          />
        </div>
        <div className="col align-content-center justify-content-end">
          <div className="card-body">
            <h5 className="card-title">{room.type}</h5>
            <p className="card-text">{room.description}</p>
            <p className="card-text">{room.amenities}</p>
            <div className="d-inline-flex gap-2">
              <button className="btn btn-primary-outline">
                <i className="bi bi-tv"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-fan"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-wifi"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-safe2"></i>
              </button>
              <button className="btn btn-primary-outline">
                <i className="bi bi-fire"></i>
              </button>
            </div>
          </div>
          
          <div className="d-inline-flex gap-2 mt-4">
            <button className="btn btn-primary">
              <i className="bi bi-share"></i>
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-heart-fill"></i>
            </button>
            <button onClick={() => handleView(room)} className="btn btn-primary">Reserve Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
