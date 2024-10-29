# Employee Registration Application

A simple Employee Registration application that allows users to manage employee records. The application includes essential features such as adding, updating, searching, and deleting employee details. Employee data is stored using arrays in local storage, ensuring convenient access and basic data persistence.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [License](#license)

## Features

### Employee Management

- **Add New Employee**: Users can register a new employee with details including Name, Email Address, Phone Number, Image, Position, and ID.
- **Search Employee**: Users can search for specific employees by their ID for quick access.
- **Edit Employee**: Users can update existing employee details.
- **Delete Employee**: Users can delete employee records that are no longer needed.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Storage**: Local Storage (using arrays to store employee data)

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/altechemist/CodeTribe.git
   cd CodeTribe/React/employee-data
   ```

2. **Install dependencies (if applicable)**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

   Open your browser and navigate to http://localhost:3000 (or the specified port)
   

## Usage

**Once the application is running, users can**:

- Navigate to the employee management page.
- Use the form to add new employee records.
- Search for employees using their ID.
- Click on an employee record to edit or delete it.

## Data Storage

The application uses the browser's local storage to store employee records. Each employee record is stored as an object within an array, allowing for easy retrieval and manipulation. When the application is closed and reopened, it loads the existing employee data from local storage.

## License

This project is licensed under the MIT License.
