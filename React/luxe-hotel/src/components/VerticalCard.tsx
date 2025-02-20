import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
import { useState, useEffect } from "react";
import { addToFavorites, removeFavorite } from "../store/slices/authSlice";

import bed from "../assets/icons/double-bed.png";
import beds from "../assets/icons/folding.png";
import people from "../assets/icons/people.png";
import Swal from 'sweetalert2';  // Import SweetAlert2

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

const VerticalCard: React.FC<CardProps> = ({ room }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the logged-in user from Redux state
  const user = useSelector((state) => state.auth.user);

  // State to track if the room is liked
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSharing, setSharing] = useState<boolean>(false);

  // Check if the room is liked when the component mounts
  useEffect(() => {
    if (user && user.favorites) {
      setIsLiked(user.favorites.includes(room.id));
    }
  }, [user, room.id]);

  // Navigate to room details page
  const roomLink = `${window.location.origin}/room/${room.type}`;
  const handleView = (room: Room) => {
    dispatch(setSelectedRoom(room));
    navigate(`/room/${room.type}`);
  };

  // Function to handle liking a room
  const handleLike = (room: Room) => {
    if (user) {
      if (isLiked) {
        // Use SweetAlert to confirm unliking the room
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to remove this room from your favorites?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#2c2c2c',
          confirmButtonText: 'Yes, remove it!',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(removeFavorite(user.uid, room.id));
            setIsLiked(false); // Toggle liked state
            Swal.fire('Removed!', 'The room has been removed from your favorites.', 'success');
          }
        });
      } else {
        // Use SweetAlert to confirm adding the room to favorites
        Swal.fire({
          title: 'Add to Favorites',
          text: 'Do you want to add this room to your favorites?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#2c2c2c',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, add it!',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(addToFavorites(user.uid, room.id));
            setIsLiked(true); // Toggle liked state
            Swal.fire('Added!', 'The room has been added to your favorites.', 'success');
          }
        });
      }
    } else {
      Swal.fire({
        title: 'Login required',
        text: 'Please log in to add this room to your favorites.',
        icon: 'info',
        confirmButtonText: 'Login'
      }).then(() => {
        navigate("/login");
      });
    }
  };

  // Function to toggle sharing options
  const handleShareToggle = () => {
    setSharing(!isSharing);
  };

  return (
    <div>
      {room ? (
        <div className="col p-2">
          <div className="card shadow border-3">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <div className="btn-group">
                  <button
                    className={`btn btn-primary bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart-fill"}`}
                    onClick={() => handleLike(room)}
                  ></button>
                  <button
                    className="btn btn-primary bi bi-share-fill"
                    onClick={handleShareToggle}
                  ></button>
                </div>

                {/* Share functionality */}
                {isSharing && (
                  <div className="btn-group ms-1" style={{ backgroundColor: "#2c2c2c" }}>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${roomLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="btn bi bi-facebook text-light"></i>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${roomLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="btn bi bi-twitter-x text-light"></i>
                    </a>
                    <a
                      href={`https://www.instagram.com/?url=${roomLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="btn bi bi-instagram text-light"></i>
                    </a>
                  </div>
                )}
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
                <ul className="d-flex list-unstyled mt-auto gap-4">
                  <li className="d-flex align-items-center me-1">
                    <img className="bi me-2" src={bed} alt="Bed icon" />
                    <small className="text-nowrap">{room.bed} Bed</small>
                  </li>
                  <li className="d-flex align-items-center me-1">
                    <img className="bi me-2" src={beds} alt="Beds icon" />
                    <small className="text-nowrap">{room.beds} Bed(s)</small>
                  </li>
                  <li className="d-flex align-items-center me-1">
                    <img className="bi me-2" src={people} alt="Guests icon" />
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
        <div className="text-center">Room information is not available.</div>
      )}
    </div>
  );
};

export default VerticalCard;
