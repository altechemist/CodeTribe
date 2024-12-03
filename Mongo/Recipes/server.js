require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", routes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);