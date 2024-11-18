import BookingsForm from "../components/BookingsForm";
import BookingSummary from "../components/BookingSummarySm";
import Footer from "../components/Footer";
import Heading from "../components/Heading";

function Bookings() {
  return (
    <div className="container-fluid">
      <Heading title="Make a Booking" />

      <div className="d-flex">
        {/* Check Availability */}
        <div className="d-flex justify-content-center col-8">
          <BookingsForm />
        </div>

        {/* Room Card */}
        <div className="d-flex col-3 mt-4">
          <BookingSummary />
        </div>
      </div>
    

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Bookings;
