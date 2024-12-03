import HeroSection from "../components/Hero";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import LeftRoomCard from "../components/LeftRoomCard";
import RightRoomCard from "../components/RightRoomCard";
import { useEffect } from "react";
import { fetchData } from "../store/slices/dbSlice";
import { Container, Spinner } from "react-bootstrap";

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

function Rooms() {
  const dispatch = useDispatch();
  
  // Fetch data from firebase
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const roomList = useSelector((state) => state.db.data);
  const loading = useSelector((state) => state.db.loading);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }


  return (
    <div>
      <HeroSection heading="Discover Our Rooms & Suites" />

      {/* Room Cards */}
      <div className="container-sm-fluid">
        <div className="text-center">
          <Heading title="Rooms & Suites" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
            reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
            eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
            inventore earum!
          </p>

          <div>
            {roomList.length > 0 && (
              <div>
                {roomList.map((room: Room, index: number) =>
                  index % 2 === 0 ? (
                    <LeftRoomCard key={room.id} room={room} />
                  ) : (
                    <RightRoomCard key={room.id} room={room} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex mb-3 mt-4">
        <Footer />
      </div>
    </div>
  );
}

export default Rooms;
