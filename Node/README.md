# Node Projects Overview

This repository features backend implementations for various applications, built using **Node.js** and **Express.js**. Each project demonstrates distinct functionalities, from employee management to interactive games.

---

### **1. Employees**  
**Description**:  
A backend API for managing employee data. Built to support CRUD operations with Firebase for storage and authentication.  

**Key Features**:  
- Secure data management with authentication.  
- Image uploads and retrieval using Firebase Storage.  

**Directory**: `employees`  

---

### **2. Employees v1**  
**Description**:  
An earlier version of the Employees API, including fundamental CRUD functionality.  

**Key Features**:  
- Basic operations for managing employee records.  
- Simpler structure ideal for learning and integration.
- Added authentication

**Directory**: `employees_v1`  

---

### **3. Guessing Game (Server)**  
**Description**:  
A backend server for a guessing game app, designed to handle game state and interactions between players.  

**Key Features**:  
- Manages game sessions and player inputs.  
- Tracks scores and game results in real-time.  

**Directory**: `guessing-game/server`  

---

### **4. Libra**  
**Description**:  
A backend API for a digital library management system, focusing on book and user data.  

**Key Features**:  
- CRUD operations for books and user data.  
- Borrowing and return management.  

**Directory**: `libra`  

---

### **5. Quiz**  
**Description**:  
A backend for a quiz application that provides dynamic question sets and tracks user scores.  

**Key Features**:  
- Fetches random questions from a database.  
- Tracks and stores user progress and results.  

**Directory**: `quiz`  

---

### **6. Server**  
**Description**:  
A general-purpose backend server template with boilerplate configurations for Express.js.  

**Key Features**:  
- Basic server with route validations

**Directory**: `server`  


---

### **7. Shopping List**  
**Description**:  
A backend for a shopping list application, enabling users to create and share lists.  

**Key Features**:  
- Create, edit, and delete items in a shopping list.  
- Share lists with other users via unique identifiers.  

**Directory**: `shopping-list`  

---

## How to Use  

1. **Clone the Repository**:  
   ```bash
   git clone <repository-url>
   cd <project-name>
   ```

2. **Navigate to the Desired Project**:  
   Choose the backend service you wish to explore or integrate.

3. **Install Dependencies**:  
   Run the following command in the selected project directory:  
   ```bash
   npm install
   ```

4. **Start the Server**:  
   ```bash
   npm start
   ```

5. **Test the API**:  
   Use tools like Postman or cURL to test the endpoints, or refer to the project-specific README for more details.
