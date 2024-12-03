const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtUtils");

// Register
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Admin
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Set role as "admin" by default for this route
    const user = new User({ email, password, role: "admin" });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Protected route
const protectedRoute = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "This is a protected route",
    user: req.user,
  });
};

module.exports = { registerUser, registerAdmin, loginUser, logoutUser, protectedRoute };
