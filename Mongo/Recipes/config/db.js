const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MongoDB URI is undefined!");
      return;
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;
