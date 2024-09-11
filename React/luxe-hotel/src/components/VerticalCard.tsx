import image from "../assets/bedroom.jpg"
function VerticalCard() {
  return (
    <div>
      <div className="col p-2">
        <div className="card shadow-sm">
          <img
            className="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            src={image}
          />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6 className="px-0 p-0">Title</h6>
              <h6 className="fw-bold px-0 pb-0">R9 999</h6>
            </div>
            <hr/>
            <p className="card-text pt-2 text-truncate">Description...</p>
            <div className="d-flex justify-content-between align-items-center">
              <ul className="d-flex list-unstyled mt-auto gap-4">
              <li className="d-flex align-items-center me-1">
                <i className="bi bi-clock me-2" />
                <small className="text-nowrap">3 Beds</small>
              </li>
              <li className="d-flex align-items-center me-2 ms-1">
                <i className="bi bi-fire me-2" />
                <small>4 Guests</small>
              </li>
              <li className="d-flex align-items-center me-2 ms-1">
                <i className="bi bi-people-fill me-2" />
                <small># Pets</small>
              </li>
              <li className="d-flex align-items-center ">
                <i className="bi bi-bookmark-heart-fill me-2" />
              </li>
                
                <div className="justify-content-end">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#viewRecipe"
                    className="btn btn-outline-primary green rounded-pill px-3 ms-4 green"
                  >
                    View
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalCard;
