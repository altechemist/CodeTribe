# Employees

The **Employees** project is a full-stack application designed to manage employee data. It includes a **React-based frontend** and a **Node.js backend** integrated with Firebase for authentication and storage.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features

- **Frontend**:
  - User-friendly interface for managing employees.
  - Authentication workflows (login, registration, password reset).
  - Employee record management with image upload.
  - Interactive forms with validation.

- **Backend**:
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

## Setup

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
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
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `employees-ui` directory:
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

## License

This project is licensed under the MIT License.

Feel free to extend or customize this README to align with your project requirements!
