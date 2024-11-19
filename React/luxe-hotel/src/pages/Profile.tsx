import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Heading from "../components/Heading";
import Account from "./Profile/Account";
import Favorites from "./Profile/Favorites";
import MyReservation from "./Profile/MyReservation";
import { useNavigate } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";
import Subheading from "../components/Subheading";
import Footer from "../components/Footer";

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
  const navigate = useNavigate();

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

  // Filter rooms by favorites
  const favoriteRooms = roomList.filter((room: Room) =>
    user?.favorites?.includes(room.id)
  );

  // Redirect to login if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    console.log(user);
  }, [user, navigate]);

  // 

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("account");

  return (
    <><div>
      {user ? (
        <div className="container-fluid mt-4 mb-4 ">
          <Heading title="Manage Account" />
          <ul className="nav nav-tabs d-flex justify-content-center gap-2">
            <li className="nav-item">
              <button
                className={`btn btn-primary rounded-pill px-3 ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
              >
                Account Details
              </button>
            </li>

            <div className="vr my-1"></div>

            <li className="nav-item">
              <button
                className={`btn btn-primary rounded-pill px-3 ${activeTab === "favorites" ? "active" : ""}`}
                onClick={() => setActiveTab("favorites")}
              >
                My Favorites
              </button>
            </li>

            <div className="vr my-1"></div>

            <li className="nav-item">
              <button
                className={`btn btn-primary rounded-pill px-3 ${activeTab === "reservations" ? "active" : ""}`}
                onClick={() => setActiveTab("reservations")}
              >
                My Reservations
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          {activeTab === "account" && (
            <div>
              <Subheading title="User Profile" />
              <Account />
            </div>
          )}
          {activeTab === "favorites" && (
            <div>
              <Subheading title="My Favorites" />
              <p className="text-center">
                View and manage your favorite rooms.
              </p>
              {roomList?.length > 0 && (
                <div className="d-flex recommendations">
                  {favoriteRooms.map((room: Room) => (
                    <VerticalCard key={room.id} room={room} />
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "reservations" && (
            <div>
              <Subheading title="My Reservations" />
              <p className="text-center">
                View and manage your hotel reservations here.
              </p>
              <MyReservation room={room} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Please log in</p>
        </div>
      )}
    </div><Footer /></>
  );
}

export default Profile;
