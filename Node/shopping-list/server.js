const http = require("http");
const shoppingListRoutes = require("./src/routes/shoppingListRoutes");
const PORT = 3000;

const server = http.createServer((req, res) => {
    shoppingListRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
