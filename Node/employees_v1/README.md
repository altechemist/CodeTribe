# Employee Management System

This project combines a **frontend application** with a **backend API** for managing employees and user authentication. It allows users to interact with employee records and user accounts seamlessly.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Frontend Usage](#frontend-usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

---

## Features

- **Frontend**:

  - User-friendly interface for managing employees.
  - Authentication workflows (login, registration, password reset).
  - Employee record management with image upload.
  - Interactive forms with validation.

- **Backend API**:
  - Secure CRUD operations on employee data via Firebase Firestore.
  - Firebase Storage for employee image uploads.
  - Firebase Authentication for user management.

---

## Technologies Used

- **Frontend**:
  - React
  - Axios (for API calls)
  - Bootstrap (styling)
- **Backend**:
  - Node.js with Express.js
  - Firebase Firestore, Authentication, and Storage

---

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase in `config/firebase.js`:

   ```javascript
   const { initializeApp } = require("firebase/app");
   const { getFirestore } = require("firebase/firestore");
   const { getAuth } = require("firebase/auth");

   const firebaseConfig = {
     apiKey: "<API_KEY>",
     authDomain: "<AUTH_DOMAIN>",
     projectId: "<PROJECT_ID>",
     storageBucket: "<STORAGE_BUCKET>",
     messagingSenderId: "<MESSAGING_SENDER_ID>",
     appId: "<APP_ID>",
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   const auth = getAuth(app);

   module.exports = { db, auth };
   ```

4. Run the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd employees-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the backend API URL:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm start
   ```

---

## Environment Variables

### Backend

- `API_KEY`
- `AUTH_DOMAIN`
- `PROJECT_ID`
- `STORAGE_BUCKET`
- `MESSAGING_SENDER_ID`
- `APP_ID`

### Frontend

- `REACT_APP_API_URL`: Base URL for the backend API.

---

## Frontend Usage

### Pages

1. **Login**: Users can log in using their email and password.
2. **Register**: New users can create accounts.
3. **Dashboard**:
   - View all employees in a table format.
   - Search and filter employees.
4. **Add Employee**: Form to add new employee details and upload images.
5. **Edit Employee**: Update existing employee records.
6. **Password Reset**: Sends a password reset link to the user.

### Components

- **EmployeeTable**: Displays a list of employees.
- **EmployeeForm**: Handles employee creation and updates.
- **AuthForms**: Manages user login and registration.

---

## API Endpoints

### Employee Management

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/employees`     | Retrieve all employees.     |
| POST   | `/employees`     | Add a new employee.         |
| GET    | `/employees/:id` | Retrieve an employee by ID. |
| PUT    | `/employees/:id` | Update employee details.    |
| DELETE | `/employees`     | Delete an employee by ID.   |

### User Authentication

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| POST   | `/auth/register`       | Register a new user.         |
| POST   | `/auth/login`          | Log in a user.               |
| POST   | `/auth/reset-password` | Send a password reset email. |

---

## Error Handling

- **Frontend**:

  - Displays error messages for invalid inputs or failed API requests.
  - Validation messages for required fields and email formats.

- **Backend**:
  - Returns structured error messages for invalid data or Firebase errors.
  - Example:
    ```json
    {
      "message": "Error retrieving employee",
      "error": "Document not found"
    }
    ```

---

## License

This project is licensed under the MIT License.

---

Feel free to extend or customize this README to align with your project requirements!
