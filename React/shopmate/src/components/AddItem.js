import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addTodoItem } from "../redux/todoListReducer";
import { selectCurrentUser } from "../redux/usersReducer";

function AddTodoItem() {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const categoryList = [
    "Fruits", "Vegetables", "Canned Goods", "Dairy", "Meat",
    "Seafood", "Deli", "Spices", "Snacks", "Bread",
    "Beverages", "Pasta", "Baking", "Frozen Foods",
    "Personal Care", "Health Care", "Baby Items", "Pet Care",
  ];

  const handleAddItem = () => {
    setFormError("");

    // Basic Validation
    if (!itemName || !itemQuantity || !itemCategory) {
      setFormError("Please fill out all fields.");
      return;
    }

    const quantity = parseInt(itemQuantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      setFormError("Quantity must be a positive number.");
      return;
    }

    // Check if item category is valid
    if (!categoryList.includes(itemCategory)) {
      setFormError("Invalid category. Please select from the list.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: itemName,
      quantity: quantity,
      category: itemCategory,
      description: itemDescription,
      completed: false,
    };

    // Dispatch the action with email included
    dispatch(addTodoItem({ todo: newItem, email: currentUser.email }));

    setFormSuccess("Item added successfully!");
    resetForm();
  };

  const resetForm = () => {
    setItemName("");
    setItemQuantity("");
    setItemCategory("");
    setItemDescription("");
  };

  // Effect to handle form success
  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => {
        setFormSuccess("");
        const button = document.getElementById("closeModal");
        if (button) button.click();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  // If no user is logged in
  if (!currentUser) {
    return (
      <div className="container-sm rounded-4 mt-4 mb-3">
        <p>Please log in to add items.</p>
      </div>
    );
  }


  return (
    <div className="container-sm rounded-4 mt-4 mb-3">
      {currentUser && <p>Adding under {currentUser.email}</p>}
      <form>
        <div className="d-flex ps-2 justify-content-start">
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          {formSuccess && <p style={{ color: "green" }}>{formSuccess}</p>}
        </div>
        <div className="d-flex gap-2 px-2 row g-2 justify-content-between w-100">
          <div className="mb-3 col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="mb-3 col-auto">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3 col-auto">
            <select
              name="categories"
              id="categories"
              className="form-select"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
            >
              <option value="" disabled>
                Category
              </option>
              {categoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <div className="d-flex g-3 p-2 col-12">
            <textarea
              className="form-control"
              placeholder="Enter Description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-2 pe-2">
          <button type="button" className="btn btn-primary" onClick={handleAddItem}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodoItem;
