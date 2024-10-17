import { useSelector } from "react-redux";
import image from "../assets/bedroom-2.jpg";

// Define the Room interface
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

// Define the shape of state
interface RootState {
  db: {
    selectedRoom: Room;
  };
}

export default function ImageGrid() {
  // Use the RootState type for the state
  const room: Room = useSelector((state: RootState) => state.db.selectedRoom);

  return (
    <div className="d-flex container-fluid rounded-3 p-2 gap-1 mb-4 text-center">
      <div className="col align-content-center">
        <div className="d-inline-flex gap-1">
          {room.images.map((img, index) => (
            <div className="d-flex img-fluid col">
              <img
                key={index}
                src={img || image}
                className="card-img-top img-fluid rounded-3 shadow"
                alt={`Room image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
