const express = require("express");
const {
  addRecipe,
  fetchRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/controllers");

const router = express.Router();

router.post("/recipes", addRecipe);
router.get("/recipes", fetchRecipes);
router.get("/recipes/:id", getRecipe);
router.put("/recipes/:id", updateRecipe);
router.delete("/recipes/:id", deleteRecipe);

module.exports = router;

