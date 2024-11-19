import image_1 from "../assets/events/1.jpg";
import image_2 from "../assets/events/4.jpg";
import image_3 from "../assets/events/3.jpg";
import image_6 from "../assets/events/6.jpg";

import Footer from "../components/Footer";
import Heading from "../components/Heading";

function Gallery() {
  return (
    <div className="container-fluid">
      <Heading title="Photos & Videos" />

      {/* Main Card */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4">
        {/* First Row of Images */}
        <div className="d-flex img-fluid w-25 col">
          <img
            src={image_1}
            className="card-img-top rounded-3"
            alt="View of the bedroom with soft lighting"
          />
        </div>
        <div className="d-flex img-fluid w-25 col">
          <img
            src={image_2}
            className="card-img-top rounded-3"
            alt="Cozy bedroom with modern furniture"
          />
        </div>
      </div>

      {/* Second Row of Images - Full width images */}
      <div className="flex container-fluid rounded-3 p-1 gap-1 mb-4">
        <div className="d-flex justify-content-center mb-4">
          <img
            src={image_3}
            className="img-fluid rounded-3"
            alt="Spacious bedroom with scenic view"
          />
        </div>
        <div className="d-flex justify-content-center mb-4">
          <img
            src={image_6}
            className="img-fluid rounded-3"
            alt="Elegant bedroom with a view of the city"
          />
        </div>
      </div>

      {/* YouTube Video */}
      <div className="mb-4 text-center">
        <h4>Watch Our Promotional Video</h4>
        <div className="embed-responsive rounded-4 p-2 embed-responsive-16by9">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // YouTube Embed URL
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Gallery;
