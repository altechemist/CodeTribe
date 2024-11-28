const { readShoppingList, writeShoppingList } = require("../utils/fileManager");

exports.getItems = (req, res) => {
    const shoppingList = readShoppingList();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ shoppingList }));
};

exports.createItem = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        try {
            const newItem = JSON.parse(body);
            if (!newItem.item || !newItem.quantity) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "Item and quantity are required" }));
                return;
            }
            const shoppingList = readShoppingList();
            newItem.id = shoppingList.length ? shoppingList[shoppingList.length - 1].id + 1 : 1;
            shoppingList.push(newItem);
            writeShoppingList(shoppingList);
            res.statusCode = 201;
            res.end(JSON.stringify({ message: "Item added successfully", newItem }));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Invalid JSON" }));
        }
    });
};

exports.updateItem = (req, res, id) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        try {
            const updatedItem = JSON.parse(body);
            const shoppingList = readShoppingList();
            const index = shoppingList.findIndex((item) => item.id === id);
            if (index === -1) {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: "Item not found" }));
                return;
            }
            shoppingList[index] = { ...shoppingList[index], ...updatedItem };
            writeShoppingList(shoppingList);
            res.statusCode = 200;
            res.end(JSON.stringify({ message: "Item updated successfully", item: shoppingList[index] }));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "Invalid JSON" }));
        }
    });
};

exports.deleteItem = (req, res, id) => {
    const shoppingList = readShoppingList();
    const index = shoppingList.findIndex((item) => item.id === id);
    if (index === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Item not found" }));
        return;
    }
    shoppingList.splice(index, 1);
    writeShoppingList(shoppingList);
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Item deleted successfully" }));
};
