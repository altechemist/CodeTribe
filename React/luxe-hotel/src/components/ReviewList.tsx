import React, { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/slices/dbSlice";

interface Review {
  id: string;
  rating: number;
  description: string;
  userName: string;
  userId: string;
  userPhoto?: string;
  createdAt: string;
}

const ReviewsList: React.FC = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.db.reviews);
  const loading = useSelector((state) => state.db.loading);
  const error = useSelector((state) => state.db.error);

   

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h3 className="text-danger">{error}</h3>
      </Container>
    );
  }

  

  return (
    <Container className="container-fluid mt-4">
      <Row className="row row-cols-1 row-cols-xl-4">
        {reviews && reviews.length > 0 ? (
          reviews.slice(0, 4).map((review: Review) => (
            <Col key={review.id} md={4} className="mb-4">
              <div className="review-card" style={styles.card}>
                <div className="review-header" style={styles.header}>
                  <img
                    src={review.userPhoto}
                    alt={review.userName}
                    style={styles.avatar}
                  />
                  <span style={styles.userName}>{review.userName}</span>
                </div>
               
                <div className="review-rating" style={styles.rating}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <i
                      key={index}
                      className={`bi bi-star-fill ${
                        index < review.rating ? "text-warning" : "text-muted"
                      }`}
                      style={styles.star}
                    />
                  ))}
                </div>
                <p style={styles.description}>{review.description}</p>
                 <hr></hr>
                <div className="review-footer" style={styles.footer}>
                  {review.createdAt}
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <p>No reviews available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

const styles = {
  card: {
    border: "0.14rem solid #2c2c2c",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(33, 37, 41, 0.1)",
    transition: "transform 0.2s",
    "&:hover": {
      // Hover effect
      transform: "scale(1.02)",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userName: {
    fontWeight: "bold",
  },
  rating: {
    marginBottom: "0.5rem",
  },
  star: {
    fontSize: "1.5rem",
  },
  description: {
    marginBottom: "1rem",
  },
  footer: {
    color: "#6c757d",
    fontSize: "0.875rem",
  },
};

export default ReviewsList;
