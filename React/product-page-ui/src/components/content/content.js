import LeftCard from "../left-card/left-card";
import RightCard from "../right-card/right-card";

function Content(props) {
  return (
    <div className="Content-container">
      {/* Left Card */}
      <div className="Left-card">
        <LeftCard />
      </div>

      {/* Right Card */}
      <div className="Right-card">
        <RightCard
          increaseCount={props.increaseCount}
          decreaseCount={props.decreaseCount}
          addToCart={props.addToCart}
          itemCount={props.itemCount}
        />
      </div>
    </div>
  );
}

export default Content;
