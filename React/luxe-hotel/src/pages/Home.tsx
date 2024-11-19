import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";
import HeroSection from "../components/Hero";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import FAQ from "../components/FAQ";
import HotelInformation from "../components/HotelInformation";
import { useEffect } from "react";
import { fetchData } from "../store/slices/dbSlice";
import { useSelector, useDispatch } from "react-redux";
import ReviewsList from "../components/ReviewList";
import { Spinner } from "react-bootstrap";


interface Room {
  id: string;
  bed: string;
  size: number;
  amenities: string;
  beds: number;
  description: string;
  guests: number;
  image: string;
  images: string[];
  price: number;
  sofa: string;
  type: string;
}

function Home() {
  const dispatch = useDispatch();
  
  // Fetch data from firebase
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { data: roomList, loading } = useSelector((state) => ({
    data: state.db.data,
    loading: state.db.loading,
  }));

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
    <div>
      {/* Hero Banner */}
      <div>
        <HeroSection heading="Welcome to Luxe Hotel" />
      </div>

      {/* Carousel */}
      <div className="mb-3 mt-4">
        <HorizontalCard />
      </div>

      {/* Recommendation */}
      <div className="mb-3 mt-4">
        <Heading title="Rooms & Suites" />
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : roomList.length > 0 ? (
          <div className="d-flex recommendations">
            {roomList.map((room: Room) => (
              <VerticalCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading Rooms...</p>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mb-3 mt-4">
      <Heading title="Reviews" />
      <ReviewsList />
      </div>

      {/* Hotel Information */}
      <div className="mb-3 mt-4">
        <Heading title="Hotel Information" />
        <HotelInformation />
      </div>

      {/* Frequently Asked Questions */}
      <div className="container-xl">
        <FAQ questions={hotelQuestions}/>
      </div>

      {/* Footer */}
      <div className="d-flex mb-3 mt-4">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
