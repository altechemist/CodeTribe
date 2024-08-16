import { useEffect, useState } from "react";
import axios from "axios";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./components/card";
import ViewRecipe from "./components/viewRecipe";

function App() {
  interface Ingredient {
    name: string;
    quantity: string;
  }
  
  interface Recipe {
    id: number;
    image: string;
    title: string;
    name: string;
    description: string;
    total_time: string;
    calories: number;
    servings: number;
    prep_time: string;
    cook_time: string;
    ingredients: Ingredient[];
    steps: string[];
  }
  
  // Recipes data
  const [recipes, setRecipes] = useState([]);

  // Fetches recipes
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const recipesList = await axios.get(`http://localhost:3001/api/data`);
      console.log(recipesList);
      if (Array.isArray(recipesList.data)) {
        setRecipes(recipesList.data);
        console.log("Recipes: " + recipesList.data);
      } else {
        console.error("Expected an array but got:", recipesList.data.recipes);
      }
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  // Button styles
  const buttonStyles = {
    default: {
      backgroundColor: "#164240",
      border: "3px solid #164240",
      borderRadius: "5px",
      color: "#f7f7f7",
      cursor: "pointer",
    },
    active: {
      backgroundColor: "#9acd32",
      border: "3px solid #164240",
      color: "#f7f7f7",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  // Show recipes based on category
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryList: string[] = [
    "All",
    "Main",
    "Sides",
    "Dessert",
    "Drinks",
    "Breakfast",
    "Soups",
    "Salads",
    "Baking",
    "Vegan",
    "Holiday",
  ];
  const [category, setCategory] = useState<string>("");
  const selectCategory = (category: string) => {
    setCategory(category);
    setActiveCategory(category);
    filterRecipes(category);
  };

  // Filters recipes based on category
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const filterRecipes = (selectedCategory: string) => {
    // If category is All
    if (selectedCategory === "All") {
      setCategory("");
      setFilteredRecipes([]);
      return;
    }

    const filtered = recipes.filter(
      (recipe) => recipe.category === selectedCategory.toLowerCase()
    );
    setFilteredRecipes(filtered);
  };

  // Track selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState({});

  // Sets the selected recipe
  const selectRecipe = (rid: number) => {
    setSelectedRecipe(recipes.find((recipe) => recipe.id === rid)!);
  };

  // State variables for recipe details
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rCategory, setRCategory] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [totalTime, setTotalTime] = useState<number>(0);
  const [calories, setCalories] = useState<string>("");
  const [servings, setServings] = useState<string>("");

  // State variables for ingredients
  const [ingredientName, setIngredientName] = useState<string>("");
  const [ingredientQuantity, setIngredientQuantity] = useState<string>("");
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string }[]
  >([]);

  // State variables for preparation steps
  const [stepDescription, setStepDescription] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);

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
    // Generate id
    const id: number = recipes.length;

    // Calculate total time
    const totalTime = parseInt(prepTime) + parseInt(cookTime);
    setTotalTime(totalTime);

    const newRecipe = {
      id,
      name,
      category: rCategory,
      image,
      description,
      ingredients,
      steps,
      servings,
      prep_time: prepTime + " mins",
      cook_time: cookTime + " mins",
      total_time: totalTime + " mins",
      calories,
    };

    // Update recipes array with the new recipe
    recipes.push(newRecipe);
    setRecipes(recipes);

    // Post the new recipes
    try {
      const response = await axios.post(
        "http://localhost:3001/api/data",
        recipes
      );
      console.log("Recipe posted successfully:", response.data);
      fetchRecipes();
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postRecipe();
  };

  // Search for recipes
  const [inputText, setInputText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const searchRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    try {
      if (inputText !== "") {
        const index = recipes.findIndex((recipe) =>
          recipe.name.toLowerCase().includes(inputText.toLowerCase())
        );
        if (index !== -1) {
          setSelectedIndex(index);
          setInputText("");
        } else {
          alert("Recipe not found");
          setInputText("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Edit selected recipe
  const editRecipe = (rid: number) => {
    const recipe = recipes.find((recipe) => recipe.id === rid);

    if (recipe) {
      setName(recipe.name);
      setImage(recipe.image);
      setDescription(recipe.description);
      setRCategory(recipe.category);
      setPrepTime(recipe.prep_time.split(" ")[0]);
      setCookTime(recipe.cook_time.split(" ")[0]);
      setCalories(recipe.calories);
      setServings(recipe.servings);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setSelectedRecipe(recipe);

      // Replace the recipe
    }
  };

  // Update selected recipe
  const updateRecipe = async () => {};

  // Delete selected recipe

  // Close the search results
  const closeSearch = () => {
    setSelectedIndex(undefined);
  };

  return (
    <div className="container">
      {/* Navigation */}
      <div className="header">
        <header className="p-3 mb-3 border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
              >
                <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                ></svg>
              </a>

              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="#" className="nav-link px-2 link-secondary">
                    Flavour Book
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => selectCategory("Recommended")}
                    className="nav-link px-2 link-body-emphasis"
                  >
                    Recommended
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => selectCategory("Latest")}
                    className="nav-link px-2 link-body-emphasis"
                  >
                    Latest Recipes
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => selectCategory("Popular")}
                    className="nav-link px-2 link-body-emphasis"
                  >
                    Most Popular
                  </a>
                </li>
              </ul>

              <div
                className="search-form col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
              >
                <div className="input-container">
                  <input
                    type="search"
                    className="form-control"
                    value={inputText}
                    placeholder="Search..."
                    aria-label="Search"
                    id="inputText"
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button onClick={searchRecipe} className="search-button">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#addRecipe"
                    >
                      New Recipe...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      My Favorites
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Log in
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Search results */}
      {selectedIndex ? (
        <div className="search-results container-sm px-1 py-2 mt-3 rounded-4">
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <h4 className="pb-2 ms-3">Search Results</h4>
            <button onClick={closeSearch} className="me-2">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="card-sm p-3">
            <img
              className="search-results-image rounded-4"
              width={250}
              height={150}
              src={recipes[selectedIndex].image}
              alt={recipes[selectedIndex].title}
            />
            <div className="card-body p-3">
              <h6 className="card-header px-0 pb-3">
                {recipes[selectedIndex].name}
              </h6>
              <p className="card-text pt-2">
                {recipes[selectedIndex].description}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <ul className="d-flex list-unstyled mt-auto justify-content-between gap-1">
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-clock me-2" />
                    <small>{recipes[selectedIndex].total_time}</small>
                  </li>
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-fire me-2" />
                    <small>{recipes[selectedIndex].calories}</small>
                  </li>
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-people-fill me-2" />
                    <small>{recipes[selectedIndex].servings}</small>
                  </li>
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-bookmark-heart-fill me-2" />
                  </li>
                  <button
                    onClick={() => selectRecipe(recipes[selectedIndex].id)}
                    data-bs-toggle="modal"
                    data-bs-target="#viewRecipe"
                    className="btn btn-outline-primary rounded-pill px-3 ms-4 green"
                  >
                    View
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* Categories */}
      <div className="d-flex gap-2 justify-content-center py-3">
        {categoryList.map((category) => (
          <button
            onClick={() => selectCategory(category)}
            className="btn btn-primary rounded-pill px-3"
            type="button"
            style={
              activeCategory === category
                ? buttonStyles.active
                : buttonStyles.default
            }
            id={category}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Recipes */}
      <div className="container px-1 mt-3">
        {filteredRecipes.length > 0 ? (
          <div className="container px-1 mt-3">
            <h4 className="pb-2 border-bottom">{category} Recipes</h4>
            <div
              className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2"
              id="recipe-cards"
            >
              {filteredRecipes.map((recipe) => (
                <Card recipe={recipe} selectRecipe={selectRecipe} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {category === "" ? (
              <div>
                {/* Recommended Recipes */}
                <div className="container px-1 mt-3">
                  <h4 className="pb-2 border-bottom">Recommended Recipes</h4>

                  <div
                    className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2"
                    id="recipe-cards"
                  >
                    {recipes.map((recipe) => (
                      <Card recipe={recipe} selectRecipe={selectRecipe} />
                    ))}
                  </div>
                </div>

                {/* Popular Recipes */}
                <div className="container px-1 mt-3">
                  <h4 className="pb-2 border-bottom">Most Popular</h4>

                  <div
                    className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2"
                    id="recipe-cards"
                  >
                    {recipes.map((recipe) => (
                      <Card recipe={recipe} selectRecipe={selectRecipe} />
                    ))}
                  </div>
                </div>

                {/* Latest Recipes */}
                <div className="container px-1 mt-3">
                  <h4 className="pb-2 border-bottom">Latest Recipes</h4>

                  <div
                    className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2"
                    id="recipe-cards"
                  >
                    {recipes.map((recipe) => (
                      <Card recipe={recipe} selectRecipe={selectRecipe} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <h4 className="text-center mt-5">
                No {category} Recipes Found...
              </h4>
            )}
          </div>
        )}
      </div>

      {/* View Selected Recipe */}
      <ViewRecipe recipe={selectedRecipe} editRecipe={editRecipe} />
      

      {/* Add A Recipe */}
      

      {/* Edit A Recipe */}
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
                        src={selectedRecipe.image}
                        alt={selectedRecipe.name}
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
                        <option value="">{selectedRecipe.category}</option>
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
                            type="number"
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
                        {ingredients.map((ing, index) => (
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
                        {steps.map((step, index) => (
                          <li key={index}>
                            {step} <i className="bi bi-trash text-danger" />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

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
    </div>
  );
}

export default App;
