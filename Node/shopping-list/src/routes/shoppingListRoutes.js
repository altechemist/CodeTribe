const shoppingListController = require("../controllers/shoppingListController");

module.exports = (req, res) => {
    const urlParts = req.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 1], 10);

    if (req.method === "GET" && req.url === "/shopping-list") {
        return shoppingListController.getItems(req, res);
    }
    if (req.method === "POST" && req.url === "/shopping-list") {
        return shoppingListController.createItem(req, res);
    }
    if (req.method === "PUT" && req.url.startsWith("/shopping-list/")) {
        return shoppingListController.updateItem(req, res, id);
    }
    if (req.method === "DELETE" && req.url.startsWith("/shopping-list/")) {
        return shoppingListController.deleteItem(req, res, id);
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Route not found" }));
};
