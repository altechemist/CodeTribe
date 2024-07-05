import LeftCard from "../left-card/left-card";
import RightCard from "../right-card/right-card";

function Content() {
  return (
    <div className="Content-container">
      {/* Left Card */}
      <div className="Left-card">
        <LeftCard />
      </div>

      {/* Right Card */}
      <div className="Right-card">
        <RightCard />
      </div>
    </div>
  );
}

export default Content;
