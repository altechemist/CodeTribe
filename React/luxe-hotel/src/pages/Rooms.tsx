import HeroSection from "../components/Hero";
import Footer from "../components/Footer";
import image from "../assets/bedroom.jpg";
import Heading from "../components/Heading";

import { useSelector, useDispatch } from "react-redux";
import LeftRoomCard from "../components/LeftRoomCard";

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
  const roomList = useSelector((state) => state.db.data);

  return (
    <div className="container-fluid">
      <div className="">
        <HeroSection heading="Discover Our Rooms & Suites" />
      </div>

      {/* Rooms */}
      <div className="text-center">
        <Heading title="Rooms & Suites" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
          reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
          eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
          inventore earum!
        </p>

        <div>
          {/* Room Cards */}
          <div className="">
            {/* Card 1 */}
            <div>
              {roomList.length > 0 && (
                <div>
                  {roomList.map((room: Room) => (
                    <LeftRoomCard room={room} />
                  ))}
                </div>
              )}
            </div>

            {/* Card 2 */}
            <div className="d-flex container-fluid rounded-5 p-1 gap-1">
              <div className="col align-content-center justify-content-end">
                <div className="card-body">
                  <h5 className="card-title">Room 2</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-primary">View Room</button>
                </div>
              </div>
              <div className="d-flex img-fluid w-25 col">
                <img src={image} className="card-img-top rounded-5" alt="..." />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="d-flex mb-3 mt-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
