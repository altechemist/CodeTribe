import "./App.css";
import AddTodoItem from "./components/AddItem";
import TodoListItems from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [todo, setTodo] = useState([]);

  return (
    <div className="container-sm justify-content-center">
      {/* Navigation */}
      <div className="header">
        <header className="p-3 mb-3 border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
              >
                <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                ></svg>
              </a>

              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="#" className="nav-link px-2 link-secondary">
                    Shop Mate
                  </a>
                </li>
              </ul>

              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#addItemModal"
                    >
                      Add Item...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      My Favorites
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModal"
                    >
                      Register
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Log in
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Add Todo Item Modal */}
      <div>
        <div
          className="modal fade"
          id="addItemModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Item...
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <AddTodoItem />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="d-flex justify-content-center">
        <TodoListItems todo={todo} />
      </div>

      {/* Add Item button */}
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#addItemModal"
        >
          <i class="bi bi-plus-square"></i>
        </button>
      </div>

      {/* Auth modals */}
      <div className="container-sm">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default App;
