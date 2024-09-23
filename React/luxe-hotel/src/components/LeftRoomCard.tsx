import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
import { useDispatch } from "react-redux";
import Subheading from "./Subheading";

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

interface CardProps {
  room: Room;
}

const LeftRoomCard: React.FC<CardProps> = ({ room }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to navigate to room details page and set room type in URL query parameters
  const handleView = (room: Room) => {
    // Set the room type in the URL query parameters
    dispatch(setSelectedRoom(room));
    // Navigate to room details page
    navigate(`/room#CheckAvailability`);
  };

  return (
    <div className="d-flex container-fluid rounded-2 p-1 gap-1 mb-4">
      <div className="d-flex img-fluid w-25 col">
        <img src={room.image} className="card-img-top rounded-5" alt="..." />
      </div>
      <div className="col align-content-center justify-content-end">
        <div className="card-body">
          <div>
            <Subheading title={room.type}/>
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
            <div>
              <h2 className="fw-bold">R{room.price}</h2>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => handleView(room)}>
            View Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftRoomCard;
