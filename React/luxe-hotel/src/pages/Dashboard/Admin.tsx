import Heading from "../../components/Heading";
import ManageRooms from "./ManageRooms";
import Reservations from "./Reservation";
import RoomForm from "./RoomForm";

function Admin() {
  return (
    <div>
      <div>
        <Heading title="Admin Dashboard" />
        <RoomForm />
      </div>

      <Heading title="Manage Rooms" />
      <ManageRooms />

      <Heading title="Manage Reservation" />
      <Reservations />
    </div>
  );
}

export default Admin;
