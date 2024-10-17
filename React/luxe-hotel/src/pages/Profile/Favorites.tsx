import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../../store/slices/dbSlice";

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

const Favorites: React.FC<CardProps> = ({ room }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Navigate to room details page
  const handleView = (room: Room) => {
    dispatch(setSelectedRoom(room));
    navigate(`/room/#intro`);
  };

  return (
    <div id="favorites">
      {room ? (
        <div className="col p-2">
          <div className="card shadow-sm border-3">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                className="btn-group"
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                <button
                  className="btn btn-primary bi bi-heart-fill"
                  onClick={() => handleView(room)}
                ></button>
                <button
                  className="btn btn-primary bi bi-share-fill"
                  onClick={() => handleView(room)}
                ></button>
              </div>
              <img
                className="card-img-top img-fluid card-image p-1 rounded-3"
                src={room.image}
                alt={`Image of ${room.type}`}
              />
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4 className="px-0 p-0">{room.type}</h4>
                <h4 className="fw-bold px-0 pb-0">R {room.price}</h4>
              </div>
              <hr />
              <p className="card-text pt-2 text-truncate">{room.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <ul className="d-flex list-unstyled border mt-auto gap-4">
                  <li className="d-flex align-items-center me-1 border">
                    <i className="bi bi-clock me-2" />
                    <small className="text-nowrap">{room.bed} Bed</small>
                  </li>
                  <li className="d-flex align-items-center me-1 border">
                    <i className="bi bi-fire me-2" />
                    <small className="text-nowrap">{room.beds} Bed(s)</small>
                  </li>
                  <li className="d-flex align-items-center me-1 border">
                    <i className="bi bi-people-fill me-2" />
                    <small className="text-nowrap">{room.guests} Guests</small>
                  </li>
                </ul>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => handleView(room)}
                  className="btn btn-primary rounded-pill px-3"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Favorite rooms not available.</div> // Fallback message
      )}
    </div>
  );
};

export default Favorites;
