import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Alert, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchReservations } from '../../store/slices/bookingSlice';

interface Reservation {
  id: string; // Firestore document ID
  guestName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

interface Room {
  id: string;
  type: string;
  totalRooms: number;
  bookedRooms: number;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState<string>('');
  const [newReservation, setNewReservation] = useState<Reservation>({
    id: '',
    guestName: '',
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  const dispatch = useDispatch();

  // Featch reservation data
  useEffect(() => {
    dispatch(fetchReservations());
    dispatch(fetchData());
  }, [dispatch]);

  const reservationsList = useSelector((state) => state.booking.reservations);
  const roomList = useSelector((state) => state.db.data);
  

useEffect(() => {
    

    const fetchRooms = async () => {
      const response = await fetch('/api/rooms'); // Replace with your API endpoint
      const data = await response.json();
      setRooms(data);
    };

    fetchReservations();
    fetchRooms();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
    setReservations(reservations.filter(reservation => reservation.id !== id));
    setMessage('Reservation deleted successfully!');
  };

  const handleEdit = (reservation: Reservation) => {
    setNewReservation(reservation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReservation.id) {
      // Update existing reservation
      await fetch(`/api/reservations/${newReservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation),
      });
      setMessage('Reservation updated successfully!');
    } else {
      // Create new reservation
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation),
      });
      setMessage('Reservation created successfully!');
    }

    // Reset form
    setNewReservation({ id: '', guestName: '', roomType: '', checkInDate: '', checkOutDate: '', guests: 1 });
    await fetchReservations(); // Refresh reservations
  };

  const calculateAvailableRooms = (total: number, booked: number) => {
    return total - booked;
  };

  return (
    <Container className="mt-5">
      <h2>Manage Reservations</h2>
      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <h4>{newReservation.id ? 'Edit Reservation' : 'Add Reservation'}</h4>
        <Form.Group controlId="formGuestName">
          <Form.Label>Guest Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter guest name"
            value={newReservation.guestName}
            onChange={(e) => setNewReservation({ ...newReservation, guestName: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRoomType">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            as="select"
            value={newReservation.roomType}
            onChange={(e) => setNewReservation({ ...newReservation, roomType: e.target.value })}
            required
          >
            <option value="">Select room type</option>
            {rooms.map(room => (
              <option key={room.id} value={room.type}>{room.type}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCheckInDate">
          <Form.Label>Check-In Date</Form.Label>
          <Form.Control
            type="date"
            value={newReservation.checkInDate}
            onChange={(e) => setNewReservation({ ...newReservation, checkInDate: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCheckOutDate">
          <Form.Label>Check-Out Date</Form.Label>
          <Form.Control
            type="date"
            value={newReservation.checkOutDate}
            onChange={(e) => setNewReservation({ ...newReservation, checkOutDate: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGuests">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={newReservation.guests}
            onChange={(e) => setNewReservation({ ...newReservation, guests: Number(e.target.value) })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {newReservation.id ? 'Update Reservation' : 'Add Reservation'}
        </Button>
      </Form>

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
          {rooms.map(room => (
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
          {reservationsList.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.fullname}</td>
              <td>{reservation.roomType}</td>
              <td>{reservation.checkIn}</td>
              <td>{reservation.checkOut}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.status ? "Confirmed" : "Pending"}</td>
              <td>
                <div className='btn-group'>
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
    </Container>
  );
};

export default Reservations;
