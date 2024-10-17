import { useSelector } from "react-redux";
import Heading from "../components/Heading";
import Account from "./Profile/Account";
import Favorites from "./Profile/Favorites";
import MyReservation from "./Profile/MyReservation";

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

function Profile() {
  const roomList = useSelector((state) => state.db.data);
  const user = useSelector((state) => state.auth.user);

  // Reserved room
  const room: Room = {
    id: "1",
    bed: "Single",
    size: 2,
    amenities: "Breakfast, Air conditioning, WiFi",
    beds: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    guests: 2,
    image: "/images/room1.jpg",
    images: ["/images/room1.jpg", "/images/room2.jpg", "/images/room3.jpg"],
    price: 150,
    sofa: "Single",
    type: "Standard",
  };
  return (
    
    <div>
      {/* Account Details */}
      <div className="container-fluid">
        <Heading title="Account Details" />
        <Account />
      </div>

      {/* Favorites */}
      <div className="container-fluid">
        <Heading title="My Favorites" />
        <p className="text-center">View and manage your favorite rooms.</p>
        {roomList.length > 0 && (
          <div className="d-flex recommendations">
            {roomList.map((room: Room) => (
              <Favorites room={room} />
            ))}
          </div>
        )}
      </div>

      {/* Reservations */}
      <div className="container-fluid">
        <Heading title="My Reservations" />
        <p className="text-center">
          View and manage your hotel reservations here.
        </p>
        <MyReservation room={room} />
      </div>
    </div>
  );
}

export default Profile;
