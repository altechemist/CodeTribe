const http = require("http");
const fs = require("fs");
const path = require("path");
const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer((req, res) => {
  let filePath = "." + (req.url === "/" ? "/card.html" : req.url); // Updated to point to card.html
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
  };
  const contentType = mimeTypes[extname] || "application/octet-stream";
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end("Sorry, an error occurred.");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
