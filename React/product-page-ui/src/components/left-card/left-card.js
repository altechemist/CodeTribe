import productA from "../../assets/images/image-product-1.jpg";
import productB from "../../assets/images/image-product-2.jpg";
import productC from "../../assets/images/image-product-3.jpg";
import productD from "../../assets/images/image-product-4.jpg";
import thumbnailA from "../../assets/images/image-product-1-thumbnail.jpg";
import thumbnailB from "../../assets/images/image-product-2-thumbnail.jpg";
import thumbnailC from "../../assets/images/image-product-3-thumbnail.jpg";
import thumbnailD from "../../assets/images/image-product-4-thumbnail.jpg";

import { useState } from "react";

function LeftCard() {
  // Change the main image on thumbnail click
  const [mainImage, setMainImage] = useState(productA);

  const imageSlider = (source) => {
    if (source === thumbnailB) {
      setMainImage(productB);
    } else if (source === thumbnailC) {
      setMainImage(productC);
    } else if (source === thumbnailD) {
      setMainImage(productD);
    } else {
      setMainImage(productA);
    }
  };

  return (
    <div className="Left-card-content">
      {/* Main Product Image */}
      <div>
        <img src={mainImage} className="Product-image" alt="Product" />
      </div>

      {/* Product Thumbnails */}
      <div className="Product-thumbnails">
        <img
          src={thumbnailA}
          className="Product-thumbnail"
          alt="Product-thumbnail"
          onClick={() => imageSlider(thumbnailA)}
        />
        <img
          src={thumbnailB}
          className="Product-thumbnail"
          alt="Product-thumbnail"
          onClick={() => imageSlider(thumbnailB)}
        />
        <img
          src={thumbnailC}
          className="Product-thumbnail"
          alt="Product-thumbnail"
          onClick={() => imageSlider(thumbnailC)}
        />
        <img
          src={thumbnailD}
          className="Product-thumbnail"
          alt="Product-thumbnail"
          onClick={() => imageSlider(thumbnailD)}
        />
      </div>
    </div>
  );
}

export default LeftCard;
