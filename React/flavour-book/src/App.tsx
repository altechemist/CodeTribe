import { useEffect, useState } from "react";
import axios from "axios";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from "./components/card";
import ViewRecipe from "./components/viewRecipe";
import AddRecipe from "./components/addRecipe";
import EditRecipe from "./components/editRecipe";
import Auth from "./components/auth";
import Register from "./components/register";

function App() {
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
  

  // Recipes data
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
  };

  // Update selected recipe
  const updateRecipe = async () => {};

  // Delete selected recipe
  const removeRecipe = async (rid: number) => {
    // Filter out the selected recipe
    const filtered = recipes.filter((recipe) => recipe.id !== rid);

    // Update the recipe
    try {
      const response = await axios.post(
        "http://localhost:3001/api/data",
        filtered
      );
      console.log("Recipe posted successfully:", response.data);
      fetchRecipes();
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
  };

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
                    <a className="dropdown-item" href="#" data-bs-toggle="modal"
                      data-bs-target="#registerModal">
                      Register
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#authModal"
                    >
                      Log in
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
      <div className="d-flex gap-2 justify-content-start py-3 button-group">
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
      <ViewRecipe
        recipe={selectedRecipe}
        editRecipe={editRecipe}
        removeRecipe={removeRecipe}
      />

      {/* Add A Recipe */}
      <AddRecipe
        categoryList={categoryList}
        recipes={recipes}
        setRecipes={setRecipes}
        fetchRecipes={fetchRecipes}
      />

      {/* Edit A Recipe */}
      <EditRecipe
        categoryList={categoryList}
        recipes={recipes}
        setRecipes={setRecipes}
        fetchRecipes={fetchRecipes}
        recipe={selectedRecipe}
      />

      <Auth />
      <Register />
    </div>
  );
}

export default App;
