import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const RoomForm: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., send data to the backend
    console.log("Room Data Submitted:", formData);
    setMessage("Room information added successfully!");
  };

  return (
    <Container className="mt-5">
      <h2>Add Room Information</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAmenities">
          <Form.Label>Amenities</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
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

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
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
          />
        </Form.Group>

        <Form.Group controlId="formSofa">
          <Form.Label>Sofa Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter sofa type"
            name="sofa"
            value={formData.sofa}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary mt-2" type="submit">
          Add Room
        </Button>
      </Form>
    </Container>
  );
};

export default RoomForm;
