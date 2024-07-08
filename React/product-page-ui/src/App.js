import "./App.css";
import Content from "./components/content/content";
import Navigation from "./components/navigation/navigation";
import Cart from "./components/cart/cart";

import { useState } from "react";

function App() {
  // Create a new state with variable counter
  const [itemCount, setCount] = useState(0);

  // Increase counter
  const increaseCount = () => {
    setCount(itemCount + 1);
  };

  // Decrease counter
  const decreaseCount = () => {
    if (itemCount <= 0) {
      setCount(0);
    } else {
      setCount(itemCount - 1);
    }
  };

  // Add to counter
  const [cartItems, addItem] = useState(0);
  const addToCart = () => {
    addItem(cartItems + itemCount);
  };

  return (
    <div className="App">
      {/* Navigation Area */}
      <div className="Navigation">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Navigation cartItems={cartItems} />
      </div>

      {/* Cart modal */}
      <div>
        <Cart />
      </div>

      {/* Content Area */}
      <div className="Content">
        <Content
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          addToCart={addToCart}
          itemCount={itemCount}
        />
      </div>
    </div>
  );
}

export default App;
