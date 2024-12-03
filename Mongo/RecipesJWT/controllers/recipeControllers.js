const Recipe = require("../models/recipeModel");

// Create recipe
const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create recipe",
    });
  }
};

// Fetch recipes
const fetchRecipes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = parseInt(pageSize);
    const skip = (parseInt(page) - 1) * limit;

    const recipes = await Recipe.find().skip(skip).limit(limit);
    const total = await Recipe.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      pageSize: limit,
      recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch recipes",
    });
  }
};

// Get recipe
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error("Error getting recipe:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve recipe",
    });
  }
};

// Update recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update recipe",
    });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete recipe",
    });
  }
};

module.exports = {
  addRecipe,
  fetchRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
