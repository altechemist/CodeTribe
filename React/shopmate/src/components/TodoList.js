import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodoItem,
  checkout,
  updateTodoItem,
} from "../redux/todoListReducer";

function TodoListItems() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);

  // Item update form
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // State for searching
  const [searchInput, setSearchInput] = useState("");

  // State for filtering
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryList = [
    "All",
    "Fruits",
    "Vegetables",
    "Canned Goods",
    "Dairy",
    "Meat",
    "Seafood",
    "Deli",
    "Spices",
    "Snacks",
    "Bread",
    "Beverages",
    "Pasta",
    "Baking",
    "Frozen Foods",
    "Personal Care",
    "Health Care",
    "Baby Items",
    "Pet Care",
  ];

  // Filter items based on active category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(todoList);
    } else {
      setFilteredItems(
        todoList.filter((item) => item.category === activeCategory)
      );
    }
  }, [todoList, activeCategory]);

  const handleUpdate = (id) => {
    const item = todoList.find((item) => item.id === id);

    if (item) {
      setSelectedItem(id);
      setItemName(item.name);
      setItemQuantity(item.quantity);
      setItemCategory(item.category);
      setItemDescription(item.description);
    }
  };

  const postUpdate = () => {
    if (selectedItem) {
      const updatedItem = {
        id: selectedItem,
        name: itemName,
        quantity: itemQuantity,
        category: itemCategory,
        description: itemDescription,
      };

      dispatch(updateTodoItem(updatedItem));
      setItemName("");
      setItemQuantity("");
      setItemCategory("");
      setItemDescription("");
      setSelectedItem("");
    }
  };

  // Handle item deletion
  const handleDelete = (id) => {
    dispatch(deleteTodoItem(id));
  };

  // Button styles
  const buttonStyles = {
    default: {
      cursor: "pointer",
    },
    active: {
      backgroundColor: "#fff",
      border: "3px solid #0d6efd",
      color: "#0d6efd",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  const filter = (category) => {
    setActiveCategory(category);
  };

  // Sort items
  const sortItems = (order) => {
    setFilteredItems((prevItems) =>
      [...prevItems].sort((a, b) =>
        order === "up"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
    );
  };

  return (
    <div className="container-sm mb-2 border shadow-lg rounded-4">
      <div className="flex p-2">
        {todoList.length === 0 ? (
          <div className="d-flex">
          <h1 className="mb-2 p-2">Add Items...</h1>
        </div>
        ) : (
          <section>
            <div className="d-flex align-items-center">
              <h1 className="mb-2">Shopping List</h1>
              <button type="button" className="btn my-3">
                <i className="bi bi-share-fill"></i>
              </button>
            </div>
            {/* Search bar */}
            <div className="mb-3 col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Item..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

            {/* Categories */}
            <div className="d-flex gap-2 justify-content-start py-3 category-buttons">
              {categoryList.map((category) => (
                <button
                  key={category}
                  className="btn btn-primary rounded-pill px-3 btn-sm col-auto"
                  type="button"
                  style={
                    activeCategory === category
                      ? buttonStyles.active
                      : buttonStyles.default
                  }
                  onClick={() => filter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="d-flex">
            <table className="flex table table-striped-columns">
              <thead>
                <tr className="justify-content-between">
                  <th className="col-auto pb-3">Item</th>
                  <th className="col-auto pb-3">Qty</th>
                  <th className="col-auto pb-3">Category</th>
                  <th className="col-auto">
                    Action {"   "}
                    <div className="btn-group">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => sortItems("down")}
                      >
                        <i className="bi bi-sort-down"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => sortItems("up")}
                      >
                        <i className="bi bi-sort-up"></i>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        textDecoration: item.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.name}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    <td>
                      <div className="d-flex btn-group">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => handleUpdate(item.id)}
                        >
                          <i className="bi bi-pencil-square" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => dispatch(checkout(item.id))}
                        >
                          {item.completed ? (
                            <i className="bi bi-arrow-counterclockwise" />
                          ) : (
                            <i className="bi bi-check-circle" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
        )}
      </div>

      <div className="edit-item-modal">
        <div
          className="modal fade"
          id="editModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Update Item...
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex px-2 row g-2 justify-content-center">
                  <div className="mb-3 col-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 col-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 col-3">
                    <select
                      name="categories"
                      id="categories"
                      className="form-select"
                      value={itemCategory}
                      onChange={(e) => setItemCategory(e.target.value)}
                    >
                      {categoryList.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <div className="d-flex g-3 p-2 w-100">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Enter Description"
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={postUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoListItems;
