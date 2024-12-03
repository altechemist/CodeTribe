const express = require("express");
const { registerUser, loginUser, protectedRoute, logoutUser,  registerAdmin } = require("../controllers/userControllers");
const { protect } = require("../middleware/middleware");

const router = express.Router();


router.post("/register", registerUser);
router.post("/register/admin", registerAdmin); 
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/protected", protect, protectedRoute);

module.exports = router;
