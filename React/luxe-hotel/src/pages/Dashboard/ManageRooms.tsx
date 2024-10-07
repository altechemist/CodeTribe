import React, { useEffect, useState } from "react";
import { Button, Table, Container, Alert, Modal } from "react-bootstrap";


import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoom, updateRoom } from "../../store/slices/dbSlice";
import { fetchData } from "../../store/slices/bookingSlice";


import EditForm from "./EditForm";


// Define the Room interface for type safety
interface Room {
  id: string;
  amenities: string;
  bed: string;
  beds: number;
  description: string;
  guests: number;
  image: string;
  images: string[];
  price: number;
  size: number;
  sofa: string;
  type: string;
}

const ManageRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState<string>("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Fetch data from firebase
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const roomList = useSelector((state) => state.booking.data);

  console.log(roomList);


  const handleDelete = async (id: string) => {
    // Logic to delete the room (replace with your database call)
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    setRooms(rooms.filter((room) => room.id !== id));
    setMessage("Room deleted successfully!");
  };

  const handleEdit = (room: Room) => {
    dispatch(setSelectedRoom(room));
    handleShow();
  };

  

  return (
    <Container className="mt-5">
      {message && <Alert variant="success">{message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amenities</th>
            <th>Bed Type</th>
            <th>Number of Beds</th>
            <th>Description</th>
            <th>Max Guests</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.amenities}</td>
              <td>{room.bed}</td>
              <td>{room.beds}</td>
              <td>{room.description}</td>
              <td>{room.guests}</td>
              <td>{room.price}</td>
              <td>
                <div className="btn-group">
                  <Button variant="warning" onClick={() => handleEdit(room)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(room.id)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
 
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Room Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageRooms;
