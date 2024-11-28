import React, { useEffect, useState } from "react";
import { Button, Table, Container, Alert, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchReservations, fetchData, addReservation, updateReservation, deleteReservation } from "../../store/slices/bookingSlice";

interface Reservation {
  fullname: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface Room {
  id: string;
  type: string;
  totalRooms: number;
  bookedRooms: number;
}

const Reservations: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [newReservation, setNewReservation] = useState<Reservation>({
    fullname: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Fetch reservation data and rooms data on component mount
  useEffect(() => {
    dispatch(fetchReservations()); // Fetch reservations from Redux
    dispatch(fetchData()); // Fetch rooms from Redux
  }, [dispatch]);

  // Access reservations and rooms data from Redux store
  const reservationsList = useSelector((state: any) => state.booking.reservations);
  const roomList = useSelector((state: any) => state.booking.data);

  const roomTypes = roomList.map((room: Room) => room.type);

  console.log(reservationsList)

  // Handle Delete Reservation
  const handleDelete = (id: string) => {
    dispatch(deleteReservation(id)); // Dispatch delete action
    setMessage("Reservation deleted successfully!");
  };

  // Handle Edit Reservation
  const handleEdit = (reservation: Reservation) => {
    setNewReservation(reservation);
    setShowModal(true);
  };

  // Handle Add/Update Reservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReservation.id) {
      // Update existing reservation
      dispatch(updateReservation(newReservation.id, newReservation));
      setMessage("Reservation updated successfully!");
    } else {
      // Add new reservation
      dispatch(addReservation(newReservation));
      setMessage("Reservation created successfully!");
    }

    // Reset form and close modal
    setNewReservation({
      fullname: "",
      roomType: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
    });
    setShowModal(false);
  };

  // Calculate available rooms
  const calculateAvailableRooms = (total: number, booked: number) => {
    return total - booked;
  };

  return (
    <Container className="mt-5 mb-5 container-fluid flex">
      {message && <Alert variant="success">{message}</Alert>}

      {/* Modal for Add/Edit Reservation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newReservation.id ? "Edit Reservation" : "Add Reservation"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGuestName">
              <Form.Label>Guest Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guest name"
                value={newReservation.fullname}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    fullname: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formRoomType">
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                as="select"
                value={newReservation.roomType}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    roomType: e.target.value,
                  })
                }
                required
              >
                <option value="">Select room type</option>
                {roomTypes?.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCheckInDate">
              <Form.Label>Check-In Date</Form.Label>
              <Form.Control
                type="date"
                value={newReservation.checkIn}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    checkIn: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formCheckOutDate">
              <Form.Label>Check-Out Date</Form.Label>
              <Form.Control
                type="date"
                value={newReservation.checkOut}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    checkOut: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formGuests">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={newReservation.guests}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    guests: Number(e.target.value),
                  })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {newReservation.id ? "Update Reservation" : "Add Reservation"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h2 className="mt-5">Room Availability</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Total Rooms</th>
            <th>Booked Rooms</th>
            <th>Available Rooms</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room: Room) => (
            <tr key={room.id}>
              <td>{room.type}</td>
              <td>{room.totalRooms}</td>
              <td>{room.bookedRooms}</td>
              <td>{calculateAvailableRooms(room.totalRooms, room.bookedRooms)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-5">Current Reservations</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest Name</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationsList.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.fullname}</td>
              <td>{reservation.roomType}</td>
              <td>{reservation.checkIn}</td>
              <td>{reservation.checkOut}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.status ? "Confirmed" : "Pending"}</td>
              <td>
                <div className="btn-group">
                  <Button variant="warning" onClick={() => handleEdit(reservation)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(reservation.id)} className="ms-2">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="container-sm d-flex justify-content-end">
        <Button variant="primary" onClick={() => {
          setNewReservation({
            fullname: "",
            roomType: "",
            checkIn: "",
            checkOut: "",
            guests: 1,
          });
          setShowModal(true);
        }}>
          Add Reservation
        </Button>
      </div>
    </Container>
  );
};

export default Reservations;
