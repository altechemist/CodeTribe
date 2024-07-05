import "./App.css";
import Content from "./components/content/content";
import Navigation from "./components/navigation/navigation";

function App() {
  return (
    <div className="App">
      {/* Navigation Area */}
      <div className="Navigation">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Navigation />
      </div>

      {/* Cart modal */}

      {/* Content Area */}
      <div className="Content">
        <Content />
      </div>
    </div>
  );
}

export default App;
