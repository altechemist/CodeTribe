import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/Heading";
import AddRoom from "./AddRoom";
import ManageRooms from "./ManageRooms";
import Reservations from "./Reservation";
import { fetchData, fetchReservations } from "../../store/slices/bookingSlice"; // Ensure proper imports

function Admin() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.booking.loading);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchData()); // Fetch room data
    dispatch(fetchReservations()); // Fetch reservation data
  }, [dispatch]);



  return (
    <div>
      <div className="container-fluid">
        <Heading title="Manage Rooms" />
        <ManageRooms />
        <div className="container-sm d-flex justify-content-end">
          <AddRoom />
        </div>
      </div>

      <div>
        <Heading title="Manage Reservation" />
        <Reservations />
      </div>
    </div>
  );
}

export default Admin;
