const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'books.json');

// Load books data from the JSON file
function loadBooksData() {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// Save books data to the JSON file
function saveBooksData(books) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), 'utf8');
}

let books = loadBooksData();

// Set up the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    if (method === 'GET') {
        handleGetRequests(parsedUrl, res);
    } else if (method === 'POST') {
        handlePostRequests(req, res);
    } else if (method === 'PUT' || method === 'PATCH') {
        handlePutRequests(parsedUrl, req, res);
    } else if (method === 'DELETE') {
        handleDeleteRequests(parsedUrl, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Function to handle GET requests
function handleGetRequests(parsedUrl, res) {
    const { isbn } = parsedUrl.query;
    if (isbn) {
        const book = books.find(b => b.ISBN === isbn);
        if (book) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(book));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    }
}

// Function to handle POST requests
function handlePostRequests(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
        const newBook = JSON.parse(body);
        const validationError = validateBook(newBook);
        
        if (validationError) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: validationError }));
            return;
        }

        books.push(newBook);
        saveBooksData(books);  // Save updated books list to file

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newBook));
    });
}

// Function to handle PUT/PATCH requests
function handlePutRequests(parsedUrl, req, res) {
    const { isbn } = parsedUrl.query;
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const updatedBook = JSON.parse(body);
        const index = books.findIndex(b => b.ISBN === isbn);

        if (index === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
            return;
        }

        const validationError = validateBook(updatedBook);
        if (validationError) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: validationError }));
            return;
        }

        books[index] = { ...books[index], ...updatedBook };
        saveBooksData(books);  // Save updated books list to file

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books[index]));
    });
}

// Function to handle DELETE requests
function handleDeleteRequests(parsedUrl, res) {
    const { isbn } = parsedUrl.query;
    const index = books.findIndex(b => b.ISBN === isbn);

    if (index !== -1) {
        books.splice(index, 1);
        saveBooksData(books);  // Save updated books list to file
        res.writeHead(204); // No Content
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book not found' }));
    }
}

// Function to validate book data
function validateBook(book) {
    if (!book.title || typeof book.title !== 'string') {
        return 'Title is required and must be a string';
    }
    if (!book.author || typeof book.author !== 'string') {
        return 'Author is required and must be a string';
    }
    if (!book.publisher || typeof book.publisher !== 'string') {
        return 'Publisher is required and must be a string';
    }
    if (!book.publishedDate || isNaN(new Date(book.publishedDate).getTime())) {
        return 'Published date must be a valid date';
    }
    if (!book.ISBN || typeof book.ISBN !== 'string') {
        return 'ISBN is required and must be a string';
    }
    return null; // No validation errors
}
