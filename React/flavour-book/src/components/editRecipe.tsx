import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  id: number;
  image: string;
  name: string;
  description: string;
  total_time: number;
  calories: number;
  servings: number;
  prep_time: number;
  category: string;
  cook_time: number;
  ingredients: Ingredient[];
  steps: string[];
}

interface RecipeProps {
  categoryList: string[];
  recipes: Recipe[];
  recipe: Recipe;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  fetchRecipes: () => void;
}

const EditRecipe: React.FC<RecipeProps> = ({
  categoryList,
  recipes,
  fetchRecipes,
  setRecipes,
  recipe,
}) => {
  // State variables for recipe details
  const [name, setName] = useState<string>(recipe.name);
  const [image, setImage] = useState<string>(recipe.image);
  const [description, setDescription] = useState<string>(recipe.description);
  const [rCategory, setRCategory] = useState<string>(recipe.category);
  const [prepTime, setPrepTime] = useState<number>(recipe.prep_time);
  const [cookTime, setCookTime] = useState<number>(recipe.cook_time);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [calories, setCalories] = useState<number>(recipe.calories);
  const [servings, setServings] = useState<number>(recipe.servings);

  // State variables for ingredients
  const [ingredientName, setIngredientName] = useState<string>("");
  const [ingredientQuantity, setIngredientQuantity] = useState<string>("");
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string }[]
  >([]);

  // State variables for preparation steps
  const [stepDescription, setStepDescription] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
    setName(recipe.name);
    setImage(recipe.image);
    setDescription(recipe.description);
    setRCategory(recipe.category);
    setPrepTime(recipe.prep_time);
    setCookTime(recipe.cook_time);
    setCalories(recipe.calories);
    setServings(recipe.servings);
  }, [recipe]);

  // Add ingredients
  const addIngredient = () => {
    if (ingredientName && ingredientQuantity) {
      setIngredients([
        ...ingredients,
        { name: ingredientName, quantity: ingredientQuantity },
      ]);
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  // Add steps
  const addStep = () => {
    if (stepDescription) {
      setSteps([...steps, stepDescription]);
      setStepDescription("");
    }
  };

  // Function to post a new recipe
  const postRecipe = async () => {
    // Find the recipe at id
    const tmpRecipe = recipes.find((r) => r.id === recipe.id);

    // Calculate total time
    const TotalTime: number = parseInt(prepTime) + parseInt(cookTime);
    setTotalTime(TotalTime);

    // Update selected recipe
    if (tmpRecipe) {
      tmpRecipe.name = name;
      tmpRecipe.category = rCategory;
      tmpRecipe.image = image;
      tmpRecipe.description = description;
      tmpRecipe.ingredients = ingredients;
      tmpRecipe.steps = steps;
      tmpRecipe.servings = servings;
      tmpRecipe.prep_time = prepTime;
      tmpRecipe.cook_time = cookTime;
      tmpRecipe.total_time = TotalTime;
      tmpRecipe.calories = calories;
    }

    // Update recipes array with the new recipe
    setRecipes(recipes);

    // Post the new recipes
    try {
      const response = await axios.post(
        "http://localhost:3001/api/data",
        recipes
      );
      console.log("Recipe posted successfully:", response.data);
      fetchRecipes();
      Swal.fire({
        title: 'Success!',
        text: 'Recipe posted successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      return;
    } catch (error) {
      console.error("Error posting recipe:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Error posting recipe!',
        icon: 'error',
        confirmButtonText: 'Retry',
      })
      return;
    }
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     // Validate form inputs
     if (!name ||!description ||!rCategory ||!prepTime ||!cookTime ||!calories ||!servings) {
      Swal.fire({
        title: 'Missing Data!',
        text: 'All fields are required!',
        icon: 'error',
        confirmButtonText: 'Retry',
      })
      return;
    }
    postRecipe();
  };

  return (
    <div
      className="modal fade"
      id="editRecipe"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="editRecipeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editRecipeLabel">
              Edit Recipe...
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body container-sm">
            {/* Form Section */}
            <form onSubmit={handleSubmit}>
              {/* Upper Section */}
              <div className="upper-section row">
                {/* Left card */}
                <div className="left-card col p-2">
                  <h5 className="mb-4">Recipe Details</h5>
                  <div className="left-card col mb-4">
                    <img
                      className="border rounded-2"
                      src={recipe.image}
                      alt={recipe.name}
                      style={{ width: "30vh" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipeName" className="form-label">
                      Recipe Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipeName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter recipe name"
                    />
                  </div>
                  <label htmlFor="recipeImage" className="form-label">
                    Recipe Image URL
                  </label>

                  <input
                    type="text"
                    className="form-control mb-3"
                    id="recipeImage"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <div className="mb-3">
                    <label htmlFor="recipeDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="recipeDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter recipe description"
                      rows={3}
                    ></textarea>
                  </div>
                </div>

                {/* Right card */}
                <div className="right-card col p-2">
                  {/* Additional Information */}
                  <h5 className="mb-4">Additional Information</h5>
                  <div className="mb-3">
                    <label htmlFor="prepTime" className="form-label">
                      Prep Time
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="prepTime"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      placeholder="Enter prep time"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cookTime" className="form-label">
                      Cook Time
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="cookTime"
                      value={cookTime}
                      onChange={(e) => setCookTime(e.target.value)}
                      placeholder="Enter cook time"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="calories" className="form-label">
                      Calories
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="calories"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="Enter calories"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="servings" className="form-label">
                      Servings
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="servings"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      placeholder="Enter number of servings"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      value={rCategory}
                      onChange={(e) => setRCategory(e.target.value)}
                    >
                      <option value="">{recipe.category}</option>
                      {categoryList.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Mid Section */}
              {recipe.ingredients && recipe.steps ? (
                <div className="mid-section row pt-5">
                  <div className="left-card col p-2">
                    <h5 className="mb-4">Ingredients</h5>
                    <div id="ingredientsList">
                      <div className="row mb-3">
                        <div className="col-8">
                          <label
                            htmlFor="ingredientName"
                            className="form-label"
                          >
                            Ingredient Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ingredientName"
                            value={ingredientName}
                            onChange={(e) => setIngredientName(e.target.value)}
                            placeholder="Enter ingredient name"
                          />
                        </div>
                        <div className="col-4">
                          <label
                            htmlFor="ingredientQuantity"
                            className="form-label"
                          >
                            Quantity
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ingredientQuantity"
                            value={ingredientQuantity}
                            onChange={(e) =>
                              setIngredientQuantity(e.target.value)
                            }
                            placeholder="Enter quantity"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary green"
                        onClick={addIngredient}
                      >
                        Add Ingredient
                      </button>
                      <ul className="mt-3">
                        {recipe.ingredients.map((ing, index) => (
                          <li key={index}>
                            {ing.name} - {ing.quantity}{" "}
                            <i className="bi bi-trash text-danger" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="right-card col p-2">
                    <h5 className="mb-4">Preparation Method</h5>
                    <div id="stepsList">
                      <div className="mb-3">
                        <label htmlFor="stepDescription" className="form-label">
                          Step Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="stepDescription"
                          value={stepDescription}
                          onChange={(e) => setStepDescription(e.target.value)}
                          placeholder="Enter preparation step"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary green"
                        onClick={addStep}
                      >
                        Add Step
                      </button>
                      <ol className="mt-3">
                        {recipe.steps.map((step, index) => (
                          <li key={index}>
                            {step} <i className="bi bi-trash text-danger" />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No ingredients</p>
              )}

              {/* Form Submission */}
              <div className="text-end pt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn btn-primary green"
                >
                  Update Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
