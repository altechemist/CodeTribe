import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodoItem,
  checkout,
  updateTodoItem,
} from "../redux/todoListReducer";

function TodoListItems(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [list, setList] = useState("Shopping");

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

  useEffect(() => {
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === currentUser.email);
      setTodoList(user ? user.lists : []);
      setLoading(false);
    }
  }, [currentUser, todoList]);

  useEffect(() => {
    let filtered =
      activeCategory === "All"
        ? todoList
        : todoList.filter((item) => item.category === activeCategory);

    if (searchInput) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [todoList, activeCategory, searchInput]);

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

      dispatch(updateTodoItem({ todo: updatedItem, email: currentUser.email }));

      const updatedTodoList = todoList.map((item) =>
        item.id === selectedItem ? updatedItem : item
      );
      setTodoList(updatedTodoList);

      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find((user) => user.email === currentUser.email);
      if (user) {
        const itemIndex = user.lists.findIndex(
          (item) => item.id === selectedItem
        );
        if (itemIndex !== -1) {
          user.lists[itemIndex] = updatedItem;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }

      resetForm();
    }
  };

  const resetForm = () => {
    setItemName("");
    setItemQuantity("");
    setItemCategory("");
    setItemDescription("");
    setSelectedItem("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoItem({ todoId: id, email: currentUser.email }));

    // Update local state after deletion
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === currentUser.email);
    if (user) {
      user.lists = user.lists.filter((item) => item.id !== id);
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const filter = (category) => {
    setActiveCategory(category);
  };

  const sortItems = (order) => {
    setFilteredItems((prevItems) =>
      [...prevItems].sort((a, b) =>
        order === "up"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
    );
  };

  const handleNewList = () => {
    setTodoList([]);
  };

  const handleShare = () => {
    // Structure the list
    const sharedList = {
      name: list,
      items: todoList,
    };
  
    // Generate a unique share link
    const shareLink = `https://shopmate-app.com/share/${encodeURIComponent(
      JSON.stringify(sharedList)
    )}`;
  
    // Prepare share text for email/socials
    const shareText = `
      Check out this list on ShopMate:
      ${sharedList.name}
      
      Items:
      ${sharedList.items.map((item, index) => `${index + 1}. ${item}`).join("\n")}
      
      View or edit it here: ${shareLink}
    `;
  
    // Use the navigator.share API for supported platforms
    if (navigator.share) {
      navigator
        .share({
          title: `ShopMate List: ${sharedList.name}`,
          text: shareText,
          url: shareLink,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing", error));
    } else {

      // Fallback for platforms without navigator.share
      alert(
        `Your list is ready to share!\n\nCopy this text and share it via email or socials:\n\n${shareText}`
      );
    }
  
    // Log for debugging
    console.log(sharedList);
  };
  

  return (
    <div className="container-sm mb-2 border shadow-lg rounded-4">
      {/* New List */}
      <>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  New List...
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="listName" class="form-label">
                    Enter name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="listName"
                    placeholder="Shopping List"
                    onChange={e => setList(e.target.value)}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={() => handleNewList()}>
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="flex p-2">
        {loading ? (
          <h1 className="mb-2 p-2">Loading...</h1>
        ) : todoList.length === 0 ? (
          <h1 className="mb-2 p-2">Add Items...</h1>
        ) : (
          <section>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex gap-3 mb-2 align-baseline">
                <h1>{list} List</h1>

                <button
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  className="btn"
                >
                  <i className="bi bi-journal-plus"></i>
                </button>
              </div>
              <button type="button" className="btn my-3 me-0" onClick={() => handleShare()}>
                <i className="bi bi-share-fill"></i>
              </button>
            </div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Item..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <div className="d-flex gap-2 justify-content-start py-3 category-buttons">
              {categoryList.map((category) => (
                <button
                  key={category}
                  className={`btn btn-primary rounded-pill px-3 btn-sm col-auto ${
                    activeCategory === category ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => filter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <table className="table table-striped-columns">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Details</th>
                  <th>Category</th>
                  <th>
                    Action{" "}
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
                {Array.isArray(filteredItems) &&
                  filteredItems.map((item) => (
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
                      <td>{item.description}</td>
                      <td>{item.category}</td>
                      <td>
                        <div className="d-flex btn-group col-1 ms-3">
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
                            onClick={() =>
                              dispatch(
                                checkout({
                                  todoId: item.id,
                                  email: currentUser.email,
                                })
                              )
                            }
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
          </section>
        )}
      </div>

      {/* Edit Item Modal */}
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
                <h1 className="modal-title fs-5">Update Item...</h1>
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
                  <textarea
                    className="form-control"
                    placeholder="Enter Description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    rows="3"
                  ></textarea>
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
