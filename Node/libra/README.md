# Libra - Library Management System

A full-stack library management system with a React-based frontend and a Node.js backend. This application allows users to manage books, including adding, updating, and deleting book records.

---

## Features

- **Frontend**:
  - User-friendly interface for managing books.
  - Responsive design for various screen sizes.
  - Integration with the backend API for seamless data management.

- **Backend**:
  - RESTful API for managing book records.
  - File-based storage using JSON for persistence.
  - Validation for book data (e.g., ISBN uniqueness).

---

## Project Structure

- **`libra-ui/`**: React-based frontend for the library system.
  - **`src/components/BookForm.js`**: Form for adding and editing books.
  - **`src/components/BookList.js`**: Displays a list of books with delete functionality.
  - **`src/App.js`**: Main application logic, including API integration.
- **`server.js`**: Node.js backend server for handling API requests.
- **`books.json`**: File-based storage for book data.

---

## Setup

### Prerequisites

- Node.js installed on your system.

### Steps

#### Backend Setup

1. Navigate to the `libra` directory:
   ```bash
   cd libra
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend Setup

1. Navigate to the `libra-ui` directory:
   ```bash
   cd libra-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Book Management

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | `/`            | Retrieve all books.         |
| POST   | `/`            | Add a new book.             |
| PUT    | `/?isbn={isbn}`| Update a book by ISBN.      |
| DELETE | `/?isbn={isbn}`| Delete a book by ISBN.      |

---

## Environment Variables

- `PORT`: Port number for the backend server (default: `3002`).

---

## Technologies Used

- **Frontend**:
  - React
  - Bootstrap (styling)
  - Fetch API for HTTP requests

- **Backend**:
  - Node.js
  - File-based storage using JSON

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---