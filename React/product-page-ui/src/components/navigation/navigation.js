import logo from "../../assets/images/logo.svg";
import cart from "../../assets/images/icon-cart.svg";
import avatar from "../../assets/images/image-avatar.png";

function Navigation(props) {
  return (
    <div>
      <nav className="Nav-bar">
        <ul>
          {/* Company Logo */}
          <img src={logo} className="Logo" alt="logo" />

          {/* Navigation Links */}
          <li>
            <a href="#Collections">Collections</a>
          </li>
          <li>
            <a href="#Men">Men</a>
          </li>
          <li>
            <a href="#Women">Women</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
        </ul>

        {/* Navigation Buttons */}
        <div className="Nav-buttons">
          <div className="Cart-button">
            <button className="" type="Submit">
              <p className="Cart-count">{props.cartItems}</p>
              <img src={cart} alt="avatar" />
            </button>
          </div>

          <input
            className="Profile-button"
            type="image"
            src={avatar}
            alt="Avatar"
          ></input>
        </div>
      </nav>

      <div className="Divider"></div>
    </div>
  );
}

export default Navigation;
