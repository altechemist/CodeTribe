import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { addRoom } from "../../store/slices/dbSlice";

const RoomForm: React.FC = () => {
  const dispatch = useDispatch();

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
    totalRooms: 10,
    bookedRooms: 0,
  });

  const [message, setMessage] = useState("");

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

  const roomTypes = [
    "Junior Suite",
    "Luxury Suite",
    "Penthouse Suite",
    "Executive Room",
    "Family Suite",
    "Deluxe Room",
    "Honeymoon Suite",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., send data to the backend
    dispatch(addRoom(formData));

    // Reset form fields after successful submission
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
      totalRooms: 10,
      bookedRooms: 0,
    });
    setMessage("");

    console.log("Room Data Submitted:", formData);
    setMessage("Room information added successfully!");
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

        <Form.Group controlId="formNumber">
          <Form.Label>Number of Rooms</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of rooms"
            name="rooms"
            value={formData.totalRooms}
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
          Add Room
        </Button>
      </Form>
    </Container>
  );
};

export default RoomForm;
