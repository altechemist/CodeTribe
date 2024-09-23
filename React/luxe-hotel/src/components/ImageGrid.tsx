import image from "../assets/bedroom-2.jpg";
export default function ImageGrid() {
  return (
    <div className="d-flex container-fluid rounded-3 p-2 gap-1 mb-4 text-center">
        <div className="d-flex img-fluid w-25 col">
          <img src={image} className="card-img-top rounded-3" alt="..." />
        </div>
        <div className="col align-content-center">
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
  )
}
