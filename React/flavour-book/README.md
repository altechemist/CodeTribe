# Flavour Book

Flavour Book is a recipe management application that allows users to discover, add, edit, and view recipes. Users can filter recipes by category, search for specific dishes, and manage their favorite recipes seamlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [License](#license)

## Features

### Recipe Management

- **Recipe Management**: Add, edit, and delete recipes.
- **Category Filtering**: Filter recipes based on categories like Main, Dessert, Drinks, and more.
- **Search Functionality**: Search for recipes by name.
- **Responsive Design**: Built with Bootstrap for a user-friendly interface.
- **User Authentication**: Register and log in to manage your recipes securely.

## Technologies Used

- **Frontend**: React, TypeScript, Bootstrap
- **HTTP Client**: Axios for API requests
- **Local Development**: JSON Server or similar for mock API

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/altechemist/CodeTribe.git
   cd flavour-book
   ```

2. **Install dependencies (if applicable)**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

   Open your browser and navigate to http://localhost:5173/ (or the specified port)

## Usage

**Once the application is running, users can**:

- Navigate through the available recipes.
- Use the search bar to find specific recipes.
- Click on any recipe card to view details, including ingredients and preparation steps.
- Add new recipes via the "New Recipe" option in the dropdown menu.
- Edit or delete existing recipes as needed.

## Data Storage

The application utilizes a JSON server to manage recipe records. Each recipe is stored as an object in a database, allowing for easy retrieval and manipulation through RESTful API calls. When the application is launched, it fetches the existing recipe data from the JSON server, ensuring users have access to their recipes seamlessly.

## License

This project is licensed under the MIT License.
