# Shopping List App with Redux

A comprehensive Shopping List App built with Redux for state management. This app allows users to create, manage, and organize multiple shopping lists with categories, sorting, filtering, and offline support. JSON-Server is integrated for data storage, and the app includes user authentication for secure list management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [Privacy & Security](#privacy--security)
- [License](#license)

## Features

### Redux State Management

- **Redux Integration**: Use Redux to manage the application state, ensuring consistent and efficient handling of shopping list data.

### CRUD Functionality

- **Add, View, Edit, and Delete Items**: Users can easily create, view, update, and remove items on their shopping lists.

### Shopping List Management

- **Multiple Lists**: Create and manage different lists for various needs (e.g., groceries, household supplies).
- **Item Details**: Track each item’s name, quantity, and optional notes.

### Categories and Tags

- **Organize Items**: Use categories or tags to organize items for quicker access and sorting.

### Search, Sorting, and Filtering

- **Search**: Quickly find items by entering keywords.
- **Sorting & Filtering**: Sort items by name, category, or other criteria for better organization.

### Offline Support

- **Offline Availability**: Access the app offline with automatic syncing when reconnected.

### Sharing

- **Share Lists**: Share shopping lists with others via email or messaging.

### Authentication

- **User Authentication**: Secure access to shopping lists with user authentication, ensuring privacy and data protection.

### User Interface

- **Intuitive UI**: A user-friendly interface with easy-to-use controls for managing shopping lists and items.

## Technologies Used

- **Frontend**: React, Bootstrap, Redux
- **Offline Support**: Service Workers or Local Storage
-

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/altechemist/CodeTribe.git
   cd shopmate
   ```

2. **Install dependencies (if applicable)**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

   Open your browser and navigate to http://localhost:3000/ (or the specified port)

## Usage

**Once the application is running, users can**:

- Navigate through the available items.
- Use the search bar to find specific item.
- Click on any item to view details, including quantity and description.
- Add new item via the "Add" floating button.
- Edit or delete existing items as needed.

## Data Storage

The application utilizes a local storage to manage items. Each item is stored as an object in a database, allowing for easy retrieval and manipulation. When the application is launched, it fetches the existing data from the local storage ensuring users have access to their lists seamlessly.

## License

This project is licensed under the MIT License.
