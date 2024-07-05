import product from "../../assets/images/image-product-1-thumbnail.jpg";
import bin from "../../assets/images/icon-delete.svg";

function Cart() {
  return (
    <div className="Cart-modal">
      {/* Cart Card */}
      <div>
        <h4>Cart</h4>
        <div className="Divider"></div>

        <div className="Cart-items">
          <img src={product} alt="Product" />
          <div className="Cart-information">
            <p>Fall Limited Edition Sneakers</p>
            <img src={bin} alt="Delete" />
            <br></br>
            <div className="Cart-price">
              <p>$125.00 x 3 $375.00</p>
            </div>
            <button className="Checkout-button">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
