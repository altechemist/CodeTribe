import PayPalButtonComponent from "./PayPalButtons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReservation, setBookingData } from "../store/slices/bookingSlice";

export default function BookingsForm() {
  // Validate form fields
  const [isFormValid, setFormValidation] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const dispatch = useDispatch();
  const guests = useSelector((state) => state.booking.guests);
  const checkIn = useSelector((state) => state.booking.checkIn);
  const checkOut = useSelector((state) => state.booking.checkOut);
  const duration = useSelector((state) => state.booking.duration);
  const room = useSelector((state) => state.db.selectedRoom);
 

  let bookingData = {};

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validation logic
    if (!fname && !lname && !phone && !address && !country && !state && !zip) {
      alert("Please fill in all required fields.");
      return;
    };

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number format.");
      return;
    };
    
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      alert("Invalid email format.");
      return;
    };
    
    if (!/^[a-zA-Z\s]+$/.test(address)) {
      alert("Invalid address format.");
      return;
    };
    
    if (!/^\d{4}$/.test(zip)) {
      alert("Invalid zip code format.");
      return;
    };

    // Set booking data
    bookingData = {
      fullname: fname + " " + lname,
      checkIn,
      checkOut,
      duration,
      phone,
      email,
      roomType: room.type,
      guests,
      address: address + " " + country + " " + state + " " + zip,
      status: true,
    };

    dispatch(addReservation(bookingData));

    // Clear form fields
    // setFname("");
    // setLname("");
    // setPhone("");
    // setEmail("");
    // setAddress("");
    // setCountry("");
    // setState("");
    // setZip("");

    // Add to bookings slice
    console.log("Adding booking for " + bookingData);

    // Set form validation state
    setFormValidation(true);
  };

  return (
    <div className="row gap-2 reservation-form justify-content-center">
      <div className="d-flex">
        <form className="needs-validation">
          <p>Guests: {guests}</p>
          <p>rid: {room.id}</p>
          <div className="row g-3">
            <div className="col">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="John"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Doe"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="081 234 5678"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid phone number.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">
                Address 2{" "}
                <span className="text-body-secondary">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                className="form-select"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder=""
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="save-info"
            />
            <label className="form-check-label mb-4" htmlFor="save-info">
              Save this information for next time
            </label>
          </div>

          {isFormValid ? (
            <PayPalButtonComponent />
          ) : (
            <button
              className="w-100 btn btn-primary btn-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Book Now
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
