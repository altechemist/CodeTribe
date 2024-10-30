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
        <FAQ />
      </div>

      {/* Footer */}
      <div className="d-flex mb-3 mt-4">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
