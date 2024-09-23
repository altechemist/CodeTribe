import logo from "../assets/logo.png";
export default function HotelInformation() {
  return (
    <div className="d-flex justify-content-evenly align-items-center hotel-information">
      <div className="d-flex col img-fluid justify-content-center">
        <img className="img-fluid" src={logo} alt={logo} />
      </div>

      <div className="d-flex col justify-content-center">
        <ul className="text-dark list-group-flush">
          <li className="list-group-item">
            <i className="bi bi-image-alt" />
            {"  "}Garden
          </li>
          <li className="list-group-item">
            <i className="bi bi-people" />
            {"  "}Meeting Space
          </li>
          <li className="list-group-item">
            <i className="bi bi-egg-fried" />
            {"  "}Room Service
          </li>
          <li className="list-group-item">
            <i className="bi bi-water" />
            {"  "}Outdoor Pool
          </li>
          <li className="list-group-item">
            <i className="bi bi-wifi" />
            {"  "}Free WiFi
          </li>
          <li className="list-group-item">
            <i className="bi bi-p-circle" />
            {"  "}On-site Parking
          </li>
        </ul>
        <br />
        <ul className="text-dark list-group-flush">
          <li className="list-group-item">
            <i className="bi bi-clock" />
            {"  "}Check-in: 2:00 pm
          </li>
          <li className="list-group-item">
            <i className="bi bi-clock-history" />
            {"  "}Check-out: 11:00 am
          </li>
          <li className="list-group-item">
            <i className="bi bi-check-lg" />
            {"  "}Minimum Age to Check In: 18
          </li>
          <br />
          <li className="list-group-item">
            <i className="bi bi-telephone" />
            {"  "}+27 53-802-8200
          </li>
          <li className="list-group-item">
            <i className="bi bi-geo-alt" />
            {"  "}View Map
          </li>
        </ul>
      </div>
    </div>
  );
}
