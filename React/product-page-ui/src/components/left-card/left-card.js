import product from "../../assets/images/image-product-1.jpg";
import thumbnailA from "../../assets/images/image-product-1-thumbnail.jpg";
import thumbnailB from "../../assets/images/image-product-2-thumbnail.jpg";
import thumbnailC from "../../assets/images/image-product-3-thumbnail.jpg";
import thumbnailD from "../../assets/images/image-product-4-thumbnail.jpg";

function LeftCard() {
  return (
    <div className="Left-card-content">
      {/* Main Product Image */}
      <div>
        <img src={product} className="Product-image" alt="Product" />
      </div>

      {/* Product Thumbnails */}
      <div className="Product-thumbnails">
        <img
          src={thumbnailA}
          className="Product-thumbnail"
          alt="Product-thumbnail"
        />
        <img
          src={thumbnailB}
          className="Product-thumbnail"
          alt="Product-thumbnail"
        />
        <img
          src={thumbnailC}
          className="Product-thumbnail"
          alt="Product-thumbnail"
        />
        <img
          src={thumbnailD}
          className="Product-thumbnail"
          alt="Product-thumbnail"
        />
      </div>
    </div>
  );
}

export default LeftCard;
