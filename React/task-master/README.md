# To-Do List Application
A simple, user-friendly To-Do List application that allows users to register, log in, and manage their tasks efficiently. This application includes essential features for task management, such as adding, updating, searching, and deleting to-do list items, with priority levels visually distinguished by color.
## Table of Contents
- [Features](#features)
- [Pages](#pages)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Validation](#validation)
- [Security](#security)
## Features
- **User Authentication**: Secure login and registration to protect user data.
- **To-Do List Management**: Users can add, edit, delete, and search tasks.
- **Priority Levels**: Tasks can be assigned a priority level (High, Medium, Low), with each level represented by a color (e.g., Red for High, Yellow for Medium, Green for Low).
- **Responsive Design**: User-friendly, responsive interface suitable for various devices.
- **Data Persistence**: Uses SQLite for reliable data storage.
## Pages
1. **Login Page**:
   - Allows existing users to log in with a username and password.
2. **Registration Page**:
   - Enables new users to create an account by entering a username and password.
3. **Home Page**:
   - Displays the user's to-do list with options to add, edit, delete, and search tasks.
## Technologies Used
- **Frontend**: HTML, CSS, TypeScript
- **Backend**: Node.js (or your preferred backend framework)
- **Database**: SQLite
## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/altechemist/CodeTribe.git
   cd task-master
   cd frontend
   ```

2. **Install dependencies (if applicable)**:

   ```bash
   npm start (repeat for the backend folder)
   ```

3. **Run the application**:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to http://localhost:5173/ (or the specified port)

## Usage

**Once the application is running, users can**:

View the list of tasks.
Use the search bar to find specific tasks.
Click on any task to view details, including deadlines and priority levels.
Add new tasks via the "New Task" option in the dropdown menu.
Edit or delete existing tasks as needed.

## Data Storage
The application utilizes local storage to save user tasks for offline access and MySQL to manage task records. Each task is stored as an object in the MySQL database, allowing for easy retrieval and manipulation through SQL queries. When the application is launched, it fetches existing task data from MySQL and syncs it with local storage, ensuring users have seamless access to their tasks.

## License

This project is licensed under the MIT License.
