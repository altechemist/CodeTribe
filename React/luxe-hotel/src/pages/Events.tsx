import image from "../assets/bedroom-2.jpg";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
function Events() {
  return (
    <div className="container-fluid">
      <Heading title="Events & Meetings" />

      {/* Gallery */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4">
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-3" alt="..." />
        </div>
        <div className="col align-content-baseline">
          <div className="d-inline-flex gap-1">
            <img src={image} className="card-img-top rounded-3" alt="..." />
            <img src={image} className="card-img-top rounded-3" alt="..." />
          </div>
          <div className="d-inline-flex gap-1">
            <img src={image} className="card-img-top rounded-3" alt="..." />
            <img src={image} className="card-img-top rounded-3" alt="..." />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4 text-center">
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-3" alt="..." />
        </div>
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-3" alt="..." />
        </div>
      </div>

      <div className="d-flex container-fluid rounded-3 p-1 gap-1 mb-4 text-center">
        <div className="col align-content-baseline">
          <div className="d-inline-flex gap-1">
            <img src={image} className="card-img-top rounded-3" alt="..." />
            <img src={image} className="card-img-top rounded-3" alt="..." />
          </div>
          <div className="d-inline-flex gap-1">
            <img src={image} className="card-img-top rounded-3" alt="..." />
            <img src={image} className="card-img-top rounded-3" alt="..." />
          </div>
        </div>
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-3" alt="..." />
        </div>
      </div>

      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Events