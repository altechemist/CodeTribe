import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = new Database("database.db");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create tables if they don't exist
const createTables = () => {
  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`;
  const createTaskTable = `CREATE TABLE IF NOT EXISTS tasks (
    tid INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    date TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,
    uid INTEGER NOT NULL,
    FOREIGN KEY(uid) REFERENCES users(uid)
  );`;

  db.exec(createUserTable);
  db.exec(createTaskTable);
};

createTables();

// Create a new user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Prepare the SQL statement
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const stmt = db.prepare(sql);

    // Execute the SQL statement
    const info = stmt.run(name, email, password);

    // Check if the insertion was successful
    if (info.changes > 0) {
      res.status(201).json({ uid: info.lastInsertRowid });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

// Log in a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Prepare the SQL statement to find the user by email
    const sql = `SELECT * FROM users WHERE email = ?`;
    const stmt = db.prepare(sql);
    const user = stmt.get(email);

    // Check if user exists and password matches
    if (user && user.password === password) {
      res.json({ uid: user.uid, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// Get user details by uid
app.get("/users/:uid", (req, res) => {
  const { uid } = req.params;
  const sql = `SELECT * FROM users WHERE uid = ?`;
  const stmt = db.prepare(sql);
  const user = stmt.get(uid);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Insert a new task for a user
app.post("/users/:uid/tasks", (req, res) => {
  const { uid } = req.params;
  const { title, time, date, priority, status } = req.body;
  const sql = `INSERT INTO tasks (title, time, date, priority, status, uid) VALUES (?, ?, ?, ?, ?, ?)`;
  const stmt = db.prepare(sql);
  const info = stmt.run(title, time, date, priority, status, uid);
  res.status(201).json({ taskid: info.lastInsertRowid });
});

// Retrieve all tasks for a user
app.get("/users/:uid/tasks", (req, res) => {
  const { uid } = req.params;
  const sql = `SELECT * FROM tasks WHERE uid = ?`;
  const stmt = db.prepare(sql);
  const tasks = stmt.all(uid);
  res.json(tasks);
});

// Update a task by taskid
app.put("/users/:uid/tasks/:taskid", (req, res) => {
  const { uid, taskid } = req.params;
  const { title, time, date, priority, status } = req.body;

  // Basic validation
  if (!title || !time || !date || !priority || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `UPDATE tasks SET title = ?, time = ?, date = ?, priority = ?, status = ? WHERE taskid = ? AND uid = ?`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(title, time, date, priority, status, taskid, uid);

    if (info.changes > 0) {
      res.json({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ error: "Task not found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// Delete a task by taskid
app.delete("/users/:uid/tasks/:taskid", async (req, res) => {
  const { uid, taskid } = req.params;

  // Validate input if necessary
  if (!uid || !taskid) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const sql = `DELETE FROM tasks WHERE taskid = ? AND uid = ?`;
    const stmt = db.prepare(sql);
    
    // Execute the statement
    const info = stmt.run(taskid, uid);

    if (info.changes > 0) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found for this user" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);  // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Retrieve all tasks across all users (for admin or listing purposes)
app.get("/tasks", (req, res) => {
  const sql = `SELECT * FROM tasks`;
  const stmt = db.prepare(sql);
  const tasks = stmt.all();
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
