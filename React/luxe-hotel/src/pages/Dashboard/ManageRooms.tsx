import React, { useEffect, useState } from "react";
import { Button, Table, Container, Alert } from "react-bootstrap";

interface Room {
  id: string; // This would typically be the Firestore document ID
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

  useEffect(() => {
    // Fetch rooms from the database (replace with actual data fetching)
    const fetchRooms = async () => {
      // Example fetch (replace with your database call)
      const roomData = await fetch("/api/rooms"); // Replace with your API endpoint
      const rooms = await roomData.json();
      setRooms(rooms);
    };

    fetchRooms();
  }, []);

  const handleDelete = async (id: string) => {
    // Logic to delete the room (replace with your database call)
    await fetch(`/api/rooms/${id}`, { method: "DELETE" }); // Replace with your API endpoint
    setRooms(rooms.filter((room) => room.id !== id));
    setMessage("Room deleted successfully!");
  };

  const handleEdit = (id: string) => {
    // Logic to navigate to the edit room page
    // You can use react-router or similar for navigation
    console.log("Edit room with ID:", id);
  };

  return (
    <Container className="mt-5">
      <h2>Manage Rooms</h2>
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
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.amenities}</td>
              <td>{room.bed}</td>
              <td>{room.beds}</td>
              <td>{room.description}</td>
              <td>{room.guests}</td>
              <td>${room.price}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(room.id)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(room.id)}
                  className="ms-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageRooms;
