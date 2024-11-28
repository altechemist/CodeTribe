const fs = require("fs");
const path = require("path");

const shoppingListFilePath = path.join(__dirname, "../../data/shoppingList.json");

// Read shopping list
exports.readShoppingList = () => {
    if (!fs.existsSync(shoppingListFilePath)) {
        return [];
    }
    const data = fs.readFileSync(shoppingListFilePath, "utf-8");
    return JSON.parse(data);
};

// Write shopping list
exports.writeShoppingList = (data) => {
    fs.writeFileSync(shoppingListFilePath, JSON.stringify(data, null, 2));
};
