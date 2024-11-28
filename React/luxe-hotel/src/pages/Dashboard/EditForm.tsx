import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateRoom } from "../../store/slices/dbSlice";

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.db.selectedRoom);

  // Ensure room is loaded before initializing form
  const [formData, setFormData] = useState({
    amenities: "",
    bed: "",
    beds: 1,
    description: "",
    guests: 1,
    image: "",
    images: [""],
    price: 0,
    size: 0,
    sofa: "",
    type: "",
    totalRooms: 0,
    bookedRooms: 0,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (room) {
      setFormData({
        amenities: room.amenities,
        bed: room.bed,
        beds: room.beds,
        description: room.description,
        guests: room.guests,
        image: room.image,
        images: room.images,
        price: room.price,
        size: room.size,
        sofa: room.sofa,
        type: room.type,
        totalRooms: room.totalRooms,
        bookedRooms: room.bookedRooms,
      });
    }
  }, [room]); // Only runs when 'room' changes

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (index: number, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room && room.id) {
      // Dispatch the updateRoom action with the correct ID
      dispatch(updateRoom(room.id, formData));

      // Set success message after submission
      setMessage("Room information updated successfully!");

      // Optionally, reset the form fields only after successful submission
      setFormData({
        amenities: "",
        bed: "",
        beds: 1,
        description: "",
        guests: 1,
        image: "",
        images: [""],
        price: 0,
        size: 0,
        sofa: "",
        type: "",
        totalRooms: 0,
        bookedRooms: 0,
      });
    } else {
      setMessage("Error: Room ID is missing.");
    }
  };

  return (
    <Container className="mt-5">
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formType">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter room description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRoomNumber">
          <Form.Label>Number of Rooms</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of rooms"
            name="totalRooms"
            value={formData.totalRooms}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBookedNumber">
          <Form.Label>Number of Booked Rooms</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of booked rooms"
            name="bookedRooms"
            value={formData.bookedRooms}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBed">
          <Form.Label>Bed Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bed type"
            name="bed"
            value={formData.bed}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBeds">
          <Form.Label>Number of Beds</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGuests">
          <Form.Label>Max Guests</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter maximum guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSize">
          <Form.Label>Room Size (sqm)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter room size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAmenities">
          <Form.Label>Amenities</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Main Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter main image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImages">
          <Form.Label>Additional Image URLs</Form.Label>
          {formData.images.map((img, index) => (
            <div key={index} className="mb-2">
              <Form.Control
                type="text"
                placeholder={`Enter image URL ${index + 1}`}
                value={img}
                onChange={(e) => handleArrayChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() => handleArrayChange(formData.images.length, "")}
          >
            Add Another Image
          </Button>
        </Form.Group>

        <Button variant="primary mt-2" type="submit">
          Update Room
        </Button>
      </Form>
    </Container>
  );
};

export default EditForm;
