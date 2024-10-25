import image from "../assets/bedroom-2.jpg";
import Footer from "../components/Footer";
import Heading from "../components/Heading";

const images = [
  { src: image, alt: "Bedroom view 1" },
  { src: image, alt: "Bedroom view 2" },
  { src: image, alt: "Bedroom view 3" },
  { src: image, alt: "Bedroom view 4" },
  { src: image, alt: "Bedroom view 4" },
  { src: image, alt: "Bedroom view 4" },
  { src: image, alt: "Bedroom view 4" },
];

function Gallery() {
  return (
    <div className="container-fluid">
      <Heading title="Photos & Videos" />

      {/* Main Card */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4 text-center">
        {images.slice(0, 2).map((img, index) => (
          <div key={index} className="d-flex img-fluid w-25 col">
            <img
              src={img.src}
              className="card-img-top rounded-3"
              alt={img.alt}
            />
          </div>
        ))}
      </div>

      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4 text-center">
        <div className="col align-content-baseline">
          <div className="d-inline-flex gap-1">
            {images.slice(2, 4).map((img, index) => (
              <img
                key={index}
                src={img.src}
                className="card-img-top rounded-3"
                alt={img.alt}
              />
            ))}
          </div>
          <div className="d-inline-flex gap-1">
            <img
              src={images[0].src}
              className="card-img-top rounded-3"
              alt={images[0].alt}
            />
            <img
              src={images[1].src}
              className="card-img-top rounded-3"
              alt={images[1].alt}
            />
          </div>
        </div>
        <div className="d-flex img-fluid w-25 col">
          <img
            src={images[2].src}
            className="card-img-top rounded-3"
            alt={images[2].alt}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Gallery;
