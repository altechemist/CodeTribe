const express = require("express");
const { protect } = require("../middleware/auth");
const { protectAdmin } = require("../middleware/roleMiddleware");

const {
  addRecipe,
  fetchRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeControllers");

const router = express.Router();

// Public routes
router.get("/recipes", fetchRecipes);
router.get("/recipes/:id", getRecipe);

// Protected routes
router.post("/recipes", protect, protectAdmin, addRecipe);
router.put("/recipes/:id", protectAdmin, updateRecipe);
router.delete("/recipes/:id", protectAdmin, deleteRecipe);

module.exports = router;
