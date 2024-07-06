import cart from "../../assets/images/icon-cart.svg";

function RightCard(props) {
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
          <button
            className="Decrease-count-button"
            onClick={props.decreaseCount}
          >
            -
          </button>

          <button className="Item-count">{props.itemCount}</button>

          <button
            className="Increase-count-button"
            onClick={props.increaseCount}
          >
            +
          </button>

          {/* Add to cart button */}
          <div>
            <button
              className="Add-to-cart"
              onClick={props.addToCart}
              type="Submit"
            >
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
