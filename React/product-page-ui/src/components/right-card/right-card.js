import cart from "../../assets/images/icon-cart.svg";
import { useState } from "react";

function RightCard() {
  // Create a new state with variable counter
  const [count, setCount] = useState(0);

  // Increase counter
  const increase = () => {
    setCount(count + 1);
  };

  // Decrease counter
  const decrease = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  // Add to counter
  const [cartItems, addItem] = useState(0);
  const addToCart = () => {
    addItem(cartItems + count);
  };

  return (
    <div className="Right-card-content">
      {/* Product Details */}
      <div className="Product-details">
        <h4 className="Company-name">SNEAKER COMPANY</h4>
        <h1 className="Product-title">Fall Limited Edition Sneakers</h1>
        <p className="Product-summary">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything
          the weather can offer.
        </p>

        <div className="Pricing">
          <h3 className="Promo-price">$125.00</h3>
          <p className="Discount-percentage">50%</p>
        </div>

        <div className="Normal-price">$250.00</div>
      </div>

      {/* Action Buttons */}
      <div className="Action-buttons">
        <div className="Group-buttons">
          <button className="Decrease-count-button" onClick={decrease}>
            -
          </button>

          <button className="Item-count">{count}</button>

          <button className="Increase-count-button" onClick={increase}>
            +
          </button>

          {/* Add to cart button */}
          <div>
            <button className="Add-to-cart" onClick={addToCart} type="Submit">
              <img src={cart} alt="avatar" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightCard;
