require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Use the routes
app.use("/api", recipeRoutes);
app.use("/api", userRoutes);

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
