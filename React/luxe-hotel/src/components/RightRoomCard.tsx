import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../store/slices/dbSlice";
import { useState, useEffect } from "react";
import { addToFavorites, removeFavorite } from "../store/slices/authSlice";

import Swal from 'sweetalert2';  // Import SweetAlert2
import Subheading from "./Subheading";
import { useDispatch, useSelector } from "react-redux";

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

const RightRoomCard: React.FC<CardProps> = ({ room }) => {
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

  // Function to navigate to room details page and set room type in URL query parameters
  const handleView = (room: Room) => {
    dispatch(setSelectedRoom(room));
    navigate(`/room/${room.id}`);
  };

  // Function to handle liking a room
  const handleLike = (room: Room) => {
    if (user) {
      if (isLiked) {
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
            setIsLiked(false);
            Swal.fire('Removed!', 'The room has been removed from your favorites.', 'success');
          }
        });
      } else {
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
            setIsLiked(true);
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

  // Function to handle share
  const handleShare = (room: Room) => {
    const roomLink = `${window.location.origin}/room/${room.id}`;

    Swal.fire({
      title: 'Share this room',
      text: 'Do you want to share this room on social media?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, share it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Open social media share links
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${roomLink}`, '_blank');
        window.open(`https://twitter.com/intent/tweet?url=${roomLink}`, '_blank');
        window.open(`https://www.instagram.com/?url=${roomLink}`, '_blank');

        Swal.fire('Shared!', 'The room has been shared on social media.', 'success');
      }
    });
  };

  // Function to toggle sharing options visibility
  const handleShareToggle = () => {
    setSharing(!isSharing);
  };

  return (
    <div className="d-flex container-fluid rounded-5 p-1 gap-1 mb-4 right-card">
      <div className="col align-content-center justify-content-end">
        <div className="card-body p-2 right-card-content">
          <div>
            <Subheading title={room.type} />
            <p className="card-text">{room.description}</p>
            <p className="card-text">{room.amenities}</p>

            <div>
              <h2 className="fw-bold">R{room.price}</h2>
            </div>
          </div>

          <div className="btn-group gap-1">
            <button
              className={`btn btn-primary bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart-fill"}`}
              onClick={() => handleLike(room)}
            ></button>

            {/* Share button to toggle social media icons */}
            <button
              className="btn btn-primary bi bi-share-fill"
              onClick={handleShareToggle}
            ></button>
          </div>

          {/* Social media share icons */}
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

          <button className="btn btn-primary ms-2" onClick={() => handleView(room)}>
            View Room
          </button>
        </div>
      </div>
      <div className="d-flex  col">
        <img src={room.image} className="card-img-top rounded-5 shadow img-fluid" alt="Room" />
      </div>
    </div>
  );
};

export default RightRoomCard;
