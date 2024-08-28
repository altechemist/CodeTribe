import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodoItem } from "../redux/todoListReducer";

function AddTodoItem() {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const dispatch = useDispatch();

  const categoryList = [
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

  const handleAddItem = () => {
    if (!itemName) return;

    const newItem = {
      id: Date.now(),
      name: itemName,
      quantity: itemQuantity,
      category: itemCategory,
      description: itemDescription,
      completed: false,
    };

    dispatch(addTodoItem(newItem));

    // Reset form fields
    setItemName("");
    setItemQuantity("");
    setItemCategory("");
    setItemDescription("");
  };

  return (
    <div className="container-sm rounded-4 mt-4 mb-3">
      <div className="d-flex gap-2 px-2 row g-2 justify-content-between w-100">
        <div className="mb-3 col-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="mb-3 col-auto">
          <input
            type="number"
            class="form-control"
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
            class="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Enter Description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-2 pe-2">
        <button type="button" class="btn btn-primary" onClick={handleAddItem} data-bs-dismiss="modal">
          Add
        </button>
      </div>
    </div>
  );
}
export default AddTodoItem;
