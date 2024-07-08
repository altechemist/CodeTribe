import product from "../../assets/images/image-product-1-thumbnail.jpg";
import bin from "../../assets/images/icon-delete.svg";

function Cart() {
  return (
    <div className="Cart-modal">
      {/* Cart Card */}
      <div className="Cart-card">
        <h4 className="Cart-title">Cart</h4>

        <div className="Cart-items">
          <img className="Cart-thumbnail" src={product} alt="Product" />
          <div className="Cart-information">
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x 3 $375.00</p>
          </div>
          <div>
            <img className="Cart-delete" src={bin} alt="Delete" />
          </div>
        </div>

        <button className="Checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
