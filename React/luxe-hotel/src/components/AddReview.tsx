import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addReview } from "../store/slices/authSlice";

const ReviewForm: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: "",
    rating: 1,
    userName: "John Doe",
    userId: "userUid",
    userPhoto: "path/to/photo.jpg"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addReview(formData.userId, formData)); // Dispatching with user ID and review data

    // Reset form fields after successful submission
    setFormData({
      description: "",
      rating: 1, // Reset rating
      userName: "John Doe", // Reset to default or clear
      userId: "userUid",     // Reset to default or clear
      userPhoto: "path/to/photo.jpg" // Reset to default or clear
    });
    setMessage("Review submitted successfully!");

    console.log("Review Data Submitted:", formData);
  };

  return (
    <Container className="mt-5">
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRating">
          <div
            className="d-flex justify-content-between mb-3"
            style={{ fontSize: "1.5rem" }}
          >
            {/* Star icons to represent rating */}
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <i
                  key={index}
                  className={`bi bi-star-fill ${
                    index < formData.rating ? "text-warning" : "text-muted"
                  }`}
                  style={{ cursor: "pointer", flex: 1, textAlign: "center" }}
                  onClick={() =>
                    setFormData({ ...formData, rating: index + 1 })
                  }
                />
              ))}
          </div>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Write Your Experiences</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your experiences"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ReviewForm;
