import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodoItem,
  checkout,
  updateTodoItem,
  addList,
} from "../redux/todoListReducer";

function TodoListItems({ todos, activeList, setActiveList }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  const [todoLists, setTodoLists] = useState({});
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [searchInput, setSearchInput] = useState("");
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

  useEffect(() => {
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === currentUser.email);
      if (user) {
        setTodoLists(user.lists || {});
      }
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (todoLists && todoLists[activeList]) {
      const listItems = todoLists[activeList] || [];
      let filtered =
        activeCategory === "All"
          ? listItems
          : listItems.filter((item) => item.category === activeCategory);
      if (searchInput) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      setFilteredItems(filtered);
    }
  }, [todoLists, activeList, activeCategory, searchInput]);

  const handleUpdate = (id) => {
    const item = filteredItems.find((item) => item.id === id);
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

      // Update state with the new item
      setTodoLists((prevLists) => ({
        ...prevLists,
        [activeList]: prevLists[activeList].map((item) =>
          item.id === selectedItem ? updatedItem : item
        ),
      }));

      // Update localStorage
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find((user) => user.email === currentUser.email);
      if (user) {
        user.lists[activeList] = user.lists[activeList].map((item) =>
          item.id === selectedItem ? updatedItem : item
        );
        localStorage.setItem("users", JSON.stringify(users));
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

    setTodoLists((prevLists) => ({
      ...prevLists,
      [activeList]: prevLists[activeList].filter((item) => item.id !== id),
    }));

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === currentUser.email);
    if (user) {
      user.lists[activeList] = user.lists[activeList].filter(
        (item) => item.id !== id
      );
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const filter = (category) => {
    setActiveCategory(category);
  };

  const handleNewList = (listName) => {
    if (listName && !todoLists[listName]) {
      setTodoLists((prevLists) => ({
        ...prevLists,
        [listName]: [],
      }));
      setActiveList(listName);
    }

    dispatch(addList({ email: currentUser.email, listName: activeList }));
  };

  const handleShare = () => {
    const sharedList = {
      name: activeList,
      items: filteredItems,
    };

    const shareLink = `https://shopmate-app.com/share/${encodeURIComponent(
      JSON.stringify(sharedList)
    )}`;

    const shareText = `
      Check out this list on ShopMate:
      ${sharedList.name}

      Items:
      ${sharedList.items
        .map((item, index) => `${index + 1}. ${item.name}`)
        .join("\n")}
      
      View or edit it here: ${shareLink}
    `;

    if (navigator.share) {
      navigator
        .share({
          title: `ShopMate List: ${sharedList.name}`,
          text: shareText,
          url: shareLink,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert(`Share the list with this link: ${shareLink}`);
    }
  };

  // Get a list of users list
  function getListNamesByEmail(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if (user && user.lists) {
      return Object.keys(user.lists);
    }

    return [];
  }

  const listNames = getListNamesByEmail(currentUser.email);

  return (
    <div className="container-sm mb-2 border shadow-lg rounded-4">
      <div className="flex p-2">
        {loading ? (
          <h1 className="mb-2 p-2">Loading...</h1>
        ) : (
          <>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex gap-3 mb-2 align-baseline">
                <div className="flex d-flex">
                  <select
                    className="form-select form-select-lg border-0"
                    onChange={(e) => setActiveList(e.target.value)}
                    value={activeList}
                  >
                    <option value="">Select a List</option>
                    {listNames.map((listName) => (
                      <option key={listName} value={listName}>
                        {listName} List
                      </option>
                    ))}
                  </select>
                  <button
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  className="btn"
                >
                  <i className="bi bi-journal-plus"></i>
                </button>
                </div>
              </div>
              
              <button
                type="button"
                className="btn my-3 me-0"
                onClick={() => handleShare()}
              >
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredItems) &&
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => handleUpdate(item.id)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal for new list creation */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                New List...
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="listName" className="form-label">
                  Enter name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="listName"
                  placeholder="Shopping List"
                  onChange={(e) => setActiveList(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleNewList(activeList)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoListItems;
