# Shopping List

A simple Node.js application for managing a shopping list. This project provides a RESTful API for performing CRUD operations on shopping list items, with data stored in a JSON file.

---

## Features

- Add new items to the shopping list.
- Retrieve all items in the shopping list.
- Update existing items by their ID.
- Delete items from the shopping list by their ID.
- File-based storage for persistence.

---

## Project Structure

- **`server.js`**: Entry point for the application, sets up the HTTP server.
- **`src/routes/shoppingListRoutes.js`**: Defines the API routes for the shopping list.
- **`src/controllers/shoppingListController.js`**: Handles the business logic for CRUD operations.
- **`src/utils/fileManager.js`**: Utility functions for reading and writing the shopping list data.
- **`data/shoppingList.json`**: JSON file used for storing shopping list data.

---

## API Endpoints

| Method | Endpoint              | Description                  |
| ------ | --------------------- | ---------------------------- |
| GET    | `/shopping-list`      | Retrieve all shopping items. |
| POST   | `/shopping-list`      | Add a new shopping item.     |
| PUT    | `/shopping-list/:id`  | Update a shopping item.      |
| DELETE | `/shopping-list/:id`  | Delete a shopping item.      |

---

## Setup

### Prerequisites

- Node.js installed on your system.

### Steps

1. Clone the repository and navigate to the `shopping-list` directory:
   ```bash
   cd shopping-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on [http://localhost:3000](http://localhost:3000).