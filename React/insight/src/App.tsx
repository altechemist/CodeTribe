import NewsFeed from "./components/NewsFeed";
import { useState } from "react";

// Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Bookmarks from "./components/Bookmarks";

// Sweet alerts
import Swal from 'sweetalert2'
import ProfilePage from "./components/Profile";
import AuthForm from "./components/Auth";

interface Profile {
  name: string;
  email: string;
  password: string;
  preferences: Array<string>;
  bookmarks: Array<string>;
}

function App() {
  // Determine the selected news category
  const [newsCategory, setCategory] = useState<string>("General");
  const [offline, setOffline] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [user, setUser] = useState<Profile>();


  const readOffline = () => {
    if (!offline) {
      setOffline(true);
    } else {
      setOffline(false);
    }
  };

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
          <a className="navbar-brand" onClick={readOffline}>News Feed</a>
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
                <a
                  className="nav-link"
                  onClick={() => selectedCategory("Business")}
                >
                  Business
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => selectedCategory("Sports")}
                >
                  Sports
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => selectedCategory("Science")}
                >
                  Science
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => selectedCategory("Technology")}
                >
                  Technology
                </a>
              </li>
            </ul>
          </div>
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control"
              placeholder="Search..."
              aria-label="Search"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </form>
          <a className="navbar-brand" href="#" onClick={readOffline}>
            Bookmarks
          </a>
          <a className="navbar-brand" href="#" onClick={readOffline}>
          <i className="bi bi-person"></i>
          </a>
        </div>
      </nav>

      {offline ? (
        <div>
          <h2 className="display-5 fw-bold text-body-emphasis text-center pb-3">
            {newsCategory} News
          </h2>
          <NewsFeed newsCategory={newsCategory} searchTerm={searchTerm} user={user} />
        </div>
      ) : (
        <div>
          
          {user ? <ProfilePage user={user} /> : <AuthForm setUser={setUser}/>}
          {user && <Bookmarks newsCategory={newsCategory} />}
          
        </div>
      )}
    </div>
  );
}


export default App;
