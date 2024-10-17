import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Checkout from "./pages/Checkout";
import Bookings from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Events from "./pages/Events";
import Room from "./pages/Room";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Dashboard/Admin";
import Reservation from "./pages/Dashboard/Reservation";
import Account from "./pages/Profile/Account";
import Favorites from "./pages/Profile/Favorites";
import MyReservation from "./pages/Profile/MyReservation";

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

function App() {

  return (
    <Router>
      <Navbar />
      {/*Implementing Routes for respective Path */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room" element={<Room />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-password" element={<ChangePassword />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/dashboard/reservations" element={<Reservation />} />
        <Route path="/profile/account" element={ <Account /> } />
        <Route path="/profile/reservations" element={ <MyReservation /> } />
        <Route path="/profile/favorites" element={ <Profile/> } />

      </Routes>
    </Router>
  );
}

export default App;
