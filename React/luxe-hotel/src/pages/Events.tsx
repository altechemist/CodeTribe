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

  // Hotel Events & Conference FAQ
const eventQuestions = [
  {
    question: "Do you have meeting rooms available for conferences or events?",
    answer: "Yes, we have a variety of meeting rooms and event spaces available for conferences, corporate meetings, weddings, and other events. Please contact our events team for more details."
  },
  {
    question: "Can I rent audio-visual equipment for my event?",
    answer: "Yes, we offer a range of audio-visual equipment including projectors, screens, microphones, and sound systems for events. Additional charges may apply."
  },
  {
    question: "Is catering available for meetings or events?",
    answer: "We offer a wide selection of catering options, from coffee breaks to full-course meals, tailored to suit your event's needs. Our event coordinator can assist you in planning the menu."
  },
  {
    question: "Can I host a wedding or private event at the hotel?",
    answer: "Absolutely! We have several event spaces available for weddings, receptions, and private gatherings. Our event team will assist with planning all aspects of your special occasion."
  },
  {
    question: "Is there a minimum number of attendees required for events?",
    answer: "The minimum number of attendees depends on the event space and type of event. Our team will work with you to determine the best setup and options for your needs."
  },
  {
    question: "Do you offer group rates for events or conferences?",
    answer: "Yes, we offer discounted group rates for attendees of conferences or group events. Please contact our events coordinator for more information and availability."
  },
  {
    question: "Can I schedule a site visit to see the event spaces?",
    answer: "Yes, we encourage site visits to help you select the perfect event space. Please reach out to our events team to schedule a tour of our facilities."
  },
  {
    question: "Are there on-site event coordinators to assist with planning?",
    answer: "Yes, our experienced event coordinators are available to assist with all aspects of planning and executing your event, from room setup to catering and technical support."
  },
  {
    question: "Do you offer any team-building activities or services for corporate events?",
    answer: "Yes, we offer a variety of team-building activities and services tailored to corporate events. These include group challenges, workshops, and outdoor activities. Please ask our events team for recommendations."
  },
  {
    question: "Can I decorate the event space for my event?",
    answer: "Yes, we allow decoration of event spaces, but we do ask that you coordinate with our events team to ensure the decorations comply with our guidelines and do not damage the property."
  }
];


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
      <FAQ questions={eventQuestions}/>

      {/* Contact form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Events;
