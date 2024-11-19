import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
import Swal from 'sweetalert2';  // Import SweetAlert2
import Subheading from "./Subheading";
import { useState } from "react";

// Define the Room interface
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

// Define the shape of your Redux state
interface RootState {
  db: {
    selectedRoom: Room;
  };
}

export default function RoomSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the RootState type for the state
  const room: Room = useSelector((state: RootState) => state.db.selectedRoom);

  // State to track if the room is liked
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSharing, setSharing] = useState<boolean>(false);

  // Function to handle viewing the room details
  const handleView = (room: Room) => {
    dispatch(setSelectedRoom(room));
    navigate(`/room/${room.id}`);
  };

  // Function to handle "like" functionality with SweetAlert2
  const handleLike = (room: Room) => {
    Swal.fire({
      title: isLiked ? 'Remove from Favorites?' : 'Add to Favorites?',
      text: isLiked ? 'Do you want to remove this room from your favorites?' : 'Do you want to add this room to your favorites?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isLiked ? 'Yes, remove it!' : 'Yes, add it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLiked(!isLiked);  // Toggle the like state
        Swal.fire(
          isLiked ? 'Removed!' : 'Added!',
          isLiked ? 'The room has been removed from your favorites.' : 'The room has been added to your favorites.',
          'success'
        );
      }
    });
  };

  // Function to toggle social media share options
  const handleShareToggle = () => {
    setSharing(!isSharing);
  };


  return (
    <div>
      {/* Room Card */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4 text-center room-info">
        <div className="d-flex img-fluid col">
          <img
            src={room.image}
            className="card-img-top img-fluid rounded-3 shadow"
            alt="Room"
          />
        </div>
        <div className="col align-content-center justify-content-end">
          <Subheading title={room.type} />
          <div className="card-body">
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
            <h2 className="display-6 fw-bold text-center">R{room.price}</h2>
          </div>
          <div className="d-inline-flex gap-2 mt-4">
            <div className="btn-group gap-1">
              
              {/* Like button with SweetAlert2 confirmation */}
              <button
                className={`btn btn-primary ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"}`}
                onClick={() => handleLike(room)}
              ></button>
              
              {/* Share button to toggle social media icons */}
              <button
                className="btn btn-primary"
                onClick={handleShareToggle}
              >
                <i className="bi bi-share"></i>
              </button>
              
            </div>
            {/* Social media share options */}
          {isSharing && (
            <div className="btn-group ms-1" style={{ backgroundColor: "#2c2c2c" }}>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/room/${room.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="btn bi bi-facebook text-light"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.origin}/room/${room.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="btn bi bi-twitter-x text-light"></i>
              </a>
              <a
                href={`https://www.instagram.com/?url=${window.location.origin}/room/${room.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="btn bi bi-instagram text-light"></i>
              </a>
            </div>
          )}
            {/* Check availability button */}
            <button onClick={() => handleView(room)} className="btn btn-primary">
              Check Availability
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}
