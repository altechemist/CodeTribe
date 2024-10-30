import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { getImages } from "../store/slices/dbSlice";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

function Events() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.db.loading);
  const error = useSelector((state) => state.db.error);
  const gallery = useSelector((state) => state.db.eventsGallery);

  // Load images from Firestore
  useEffect(() => {
    dispatch(getImages());
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

  // Safely access images
  const images = gallery.length > 0 ? gallery[0].gallery : [];

  return (
    <div className="container-fluid">
      <Heading title="Meetings & Events" />

      {/* Content Section */}
      <div className="mb-4 text-center">
        <h2>Versatile and Well-Equipped Venues</h2>
        <p>
          Experience business in style in the Northern Cape at one of our versatile conference and event spaces. Accommodating 12 to 90 delegates, we offer a variety of included amenities, competitive group rates, straightforward conference packages, and dedicated support from our team of event professionals, making us the top choice in Kimberley.
        </p>
        <p>
          Our venues are perfect for a range of gatherings, including:
          <p>boardroom meetings, workshops, seminars, training sessions, conferences, and more.</p>
        </p>
      </div>

      {/* Gallery */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4">
        {images.length > 0 && (
          <>
            <div className="d-flex img-fluid w-25 col">
              <img src={images[0]} className="card-img-top rounded-3" alt="Gallery Image 1" />
            </div>
            <div className="col align-content-baseline">
              {images.length > 3 && (
                <div>
                  <img src={images[2]} className="card-img-top rounded-3" alt="Gallery Image 2" />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="container-fluid d-flex rounded-3 p-1 gap-1 mb-2 events-gallery">
        {images.length > 2 && (
          <div className="col">
            <img src={images[4]} className="card-img-top rounded-3" alt="Gallery Image 3" />
          </div>
        )}
        {images.length > 3 && (
          <div className="col">
            <img src={images[3]} className="card-img-top rounded-3" alt="Gallery Image 4" />
          </div>
        )}
        {images.length > 5 && (
          <div className="col">
            <img src={images[5]} className="card-img-top rounded-3" alt="Gallery Image 5" />
          </div>
        )}
      </div>

      {/* Common Questions */}
      <FAQ />

      {/* Contact form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Events;
