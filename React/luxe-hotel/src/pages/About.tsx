import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import HotelInformation from "../components/HotelInformation";
import ImageGrid from "../components/ImageGrid";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { getImages } from "../store/slices/dbSlice";

function About() {
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

  // Hotel FAQ
  const hotelQuestions = [
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in is available from 2:00 PM, and check-out is until 11:00 AM. Early check-in and late check-out may be available upon request and subject to availability."
    },
    {
      question: "Do you offer free Wi-Fi?",
      answer: "Yes, we offer complimentary Wi-Fi in all guest rooms and public areas of the hotel."
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "It depends on the room rate or package you choose. Some rates include breakfast, while others may offer it as an add-on."
    },
    {
      question: "Is there a parking fee?",
      answer: "Parking is available for an additional fee. We offer both valet and self-parking options."
    },
    {
      question: "Do you accept pets?",
      answer: "Yes, we are a pet-friendly hotel. However, a pet fee may apply, and we ask that you notify us in advance if you're traveling with a pet."
    }
  ];
  return (
    <div className="container-fluid">
      <Heading title="About Us" />
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
        reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
        eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
        inventore earum!
      </p>

      <HotelInformation />

      {/* Hotel Images */}
      <ImageGrid />
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

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* Team Members */}
      {/* <TeamMembers /> */}

      {/* FAQ */}
      <FAQ questions={hotelQuestions}/>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
