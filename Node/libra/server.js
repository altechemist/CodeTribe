const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;
const DATA_FILE = path.join(__dirname, 'books.json');

// Load books
function loadBooksData() {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// Save books
function saveBooksData(books) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), 'utf8');
}

let books = loadBooksData();

// Set up the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    if (method === 'GET') {
        getBooks(parsedUrl, res);
    } else if (method === 'POST') {
        addBook(req, res);
    } else if (method === 'PUT' || method === 'PATCH') {
        updateBook(parsedUrl, req, res);
    } else if (method === 'DELETE') {
        deleteBook(parsedUrl, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function getBooks(parsedUrl, res) {
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

function addBook(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const newBook = JSON.parse(body);
            const validationError = validateBook(newBook);

            if (validationError) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: validationError }));
                return;
            }
            // Check ISBN
            if (books.find(b => b.ISBN === newBook.ISBN)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'A book with the same ISBN already exists' }));
                return;
            }

            books.push(newBook);
            saveBooksData(books);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book added successfully', book: newBook }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON format' }));
        }
    });
}

function updateBook(parsedUrl, req, res) {
    const { isbn } = parsedUrl.query;
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
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
            saveBooksData(books);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book updated successfully', book: books[index] }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON format' }));
        }
    });
}

function deleteBook(parsedUrl, res) {
    const { isbn } = parsedUrl.query;
    const index = books.findIndex(b => b.ISBN === isbn);

    if (index !== -1) {
        const deletedBook = books.splice(index, 1)[0];
        saveBooksData(books);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book deleted successfully', book: deletedBook }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book not found' }));
    }
}

// Validation
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
    return null;
}
