import Heading from "../../components/Heading";
import AddRoom from "./AddRoom";
import ManageRooms from "./ManageRooms";
import Reservations from "./Reservation";

function Admin() {
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
