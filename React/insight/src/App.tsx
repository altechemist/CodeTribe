import NewsFeed from "./components/NewsFeed";
import { useState } from "react";

// Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  // Determine the selected news category
  const [newsCategory, setCategory] = useState<string>("general");

  const selectedCategory = (category: string) => {
    switch (category) {
      case "Business":
        setCategory("Business");
        break;

      case "Sports":
        setCategory("Sports");
        break;

      case "Science":
        setCategory("Science");
        break;

      case "Technology":
        setCategory("Technology");
        break;
      default:
        setCategory("General");
        break;
    }
  };

  return (
    <div className="container-sm">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            News Feed
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={() => selectedCategory("")}>
                  All
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => selectedCategory("Business")}>
                  Business
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => selectedCategory("Sports")}>
                  Sports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => selectedCategory("Science")}>
                  Science
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => selectedCategory("Technology")}>
                  Technology
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <h2 className="display-5 fw-bold text-body-emphasis text-center pb-3">{newsCategory} News</h2>
        <NewsFeed newsCategory={newsCategory}/>
      </div>
    </div>
  );
}

export default App;
