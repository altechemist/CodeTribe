import { useEffect, useState } from "react";
import axios from "axios";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  // Recipes data
  const [recipes, setRecipes] = useState([]);

  // Fetches recipes
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const recipesList = await axios.get(`./recipes.json`);
      if (Array.isArray(recipesList.data.recipes)) {
        setRecipes(recipesList.data.recipes);
        console.log("Recipes: " + recipesList.data.recipes);
      } else {
        console.error("Expected an array but got:", recipesList.data.recipes);
      }
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  // Show recipes based on category
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
    // Sets the selected category
    setCategory(category);
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
  const selectRecipe = (rid: number) => {
    // Sets the selected recipe
    setSelectedRecipe(recipes.find((recipe) => recipe.id === rid)!);
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

              <form
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
              >
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>

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
                    <a className="dropdown-item" href="#">
                      New Recipe...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Favorites
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
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

      {/* Categories */}
      <div className="d-flex gap-2 justify-content-center py-3">
        {categoryList.map((category) => (
          <button
            onClick={() => selectCategory(category)}
            className="btn btn-primary rounded-pill px-3"
            type="button"
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
                <div className="col p-2">
                  <div className="card shadow-sm">
                    <img
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      src={recipe.image}
                      alt={recipe.title}
                    />
                    <div className="card-body">
                      <h6 className="card-header px-0 pb-3">{recipe.name}</h6>
                      <p className="card-text pt-2">{recipe.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <ul className="d-flex list-unstyled mt-auto justify-content-between gap-1">
                          <li className="d-flex align-items-center me-2">
                            <i className="bi bi-clock me-2" />
                            <small>{recipe.total_time}</small>
                          </li>
                          <li className="d-flex align-items-center me-2">
                            <i className="bi bi-fire me-2" />
                            <small>{recipe.calories}</small>
                          </li>
                          <li className="d-flex align-items-center me-2">
                            <i className="bi bi-people-fill me-2" />
                            <small>{recipe.servings}</small>
                          </li>
                          <li className="d-flex align-items-center me-2">
                            <i className="bi bi-bookmark-heart-fill me-2" />
                          </li>
                          <button
                            onClick={() => selectRecipe(recipe.id)}
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            className="btn btn-outline-primary rounded-pill px-3 ms-4"
                          >
                            View
                          </button>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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
                      <div className="col p-2">
                        <div className="card shadow-sm">
                          <img
                            className="bd-placeholder-img card-img-top"
                            width="100%"
                            height="225"
                            src={recipe.image}
                            alt={recipe.title}
                          />
                          <div className="card-body">
                            <h6 className="card-header px-0 pb-3">
                              {recipe.name}
                            </h6>
                            <p className="card-text pt-2">
                              {recipe.description}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <ul className="d-flex list-unstyled mt-auto justify-content-between gap-1">
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-clock me-2" />
                                  <small>{recipe.total_time}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-fire me-2" />
                                  <small>{recipe.calories}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-people-fill me-2" />
                                  <small>{recipe.servings}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-bookmark-heart-fill me-2" />
                                </li>
                                <button
                                  onClick={() => selectRecipe(recipe.id)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="btn btn-outline-primary rounded-pill px-3 ms-4"
                                >
                                  View
                                </button>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      <div className="col p-2">
                        <div className="card shadow-sm">
                          <img
                            className="bd-placeholder-img card-img-top"
                            width="100%"
                            height="225"
                            src={recipe.image}
                            alt={recipe.title}
                          />
                          <div className="card-body">
                            <h6 className="card-header px-0 pb-3">
                              {recipe.name}
                            </h6>
                            <p className="card-text pt-2">
                              {recipe.description}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <ul className="d-flex list-unstyled mt-auto justify-content-between gap-1">
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-clock me-2" />
                                  <small>{recipe.total_time}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-fire me-2" />
                                  <small>{recipe.calories}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-people-fill me-2" />
                                  <small>{recipe.servings}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-bookmark-heart-fill me-2" />
                                </li>
                                <button
                                  onClick={() => selectRecipe(recipe.id)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="btn btn-outline-primary rounded-pill px-3 ms-4"
                                >
                                  View
                                </button>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      <div className="col p-2">
                        <div className="card shadow-sm">
                          <img
                            className="bd-placeholder-img card-img-top"
                            width="100%"
                            height="225"
                            src={recipe.image}
                            alt={recipe.title}
                          />
                          <div className="card-body">
                            <h6 className="card-header px-0 pb-3">
                              {recipe.name}
                            </h6>
                            <p className="card-text pt-2">
                              {recipe.description}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <ul className="d-flex list-unstyled mt-auto justify-content-between gap-1">
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-clock me-2" />
                                  <small>{recipe.total_time}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-fire me-2" />
                                  <small>{recipe.calories}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-people-fill me-2" />
                                  <small>{recipe.servings}</small>
                                </li>
                                <li className="d-flex align-items-center me-2">
                                  <i className="bi bi-bookmark-heart-fill me-2" />
                                </li>
                                <button
                                  onClick={() => selectRecipe(recipe.id)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="btn btn-outline-primary rounded-pill px-3 ms-4"
                                >
                                  View
                                </button>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
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
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Flavour Book
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body container-sm">
              {/* Upper Section */}
              <div className="upper-section row">
                {/* Left card */}
                <div className="left-card col p-2">
                  <img
                    className="border rounded-4"
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    style={{ width: "500px" }}
                  />
                </div>

                {/* Right card */}
                <div className="right-card col p-2">
                  <h2 className="card-header px-0 pt-5 pb-3">
                    {selectedRecipe.name}
                  </h2>

                  {/* Recipe description */}
                  <p className="card-text pt-2">{selectedRecipe.description}</p>

                  {/* Icon group */}
                  <div className="icon-group pt-4 pb-4">
                    <ul className="d-flex list-unstyled mt-auto justify-content-between p-2 gap-2 border rounded-4">
                      <li className="d-flex align-items-center me-2">
                        <i className="bi bi-clock me-2" />
                        <small>{selectedRecipe.total_time}</small>
                      </li>
                      <li className="d-flex align-items-center me-2">
                        <i className="bi bi-fire me-2" />
                        <small>{selectedRecipe.calories} Calories</small>
                      </li>
                      <li className="d-flex align-items-center me-2">
                        <i className="bi bi-people-fill me-2" />
                        <small>{selectedRecipe.servings} Servings</small>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mid Section */}
              <div className="mid-section row pt-5">
                <div className="left-card col p-2">
                  {/* Mapping ingredients */}
                  <h5 className="mb-4">Ingredients</h5>
                  <ul>
                    {Array.isArray(selectedRecipe.ingredients) &&
                    selectedRecipe.ingredients.length > 0 ? (
                      selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.name} - {ingredient.quantity}
                        </li>
                      ))
                    ) : (
                      <li>No ingredients available</li>
                    )}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="right-card col p-2">
                  <h5 className="mb-4">Preparation method</h5>
                  <ol className="list-group list-group-flush ms-3">
                    {Array.isArray(selectedRecipe.steps) &&
                    selectedRecipe.steps.length > 0 ? (
                      selectedRecipe.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))
                    ) : (
                      <li>No instructions available</li>
                    )}
                  </ol>
                </div>
              </div>

              {/* Icon group */}
              <div className="icon-group pt-4 pb-4">
                <ul className="d-flex list-unstyled mt-auto justify-content-between p-2 gap-2 border rounded-4">
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-clock me-2" />
                    <small>Prep Time: {selectedRecipe.prep_time}</small>
                  </li>
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-clock me-2" />
                    <small>Cook Time: {selectedRecipe.cook_time}</small>
                  </li>
                  <li className="d-flex align-items-center me-2">
                    <i className="bi bi-people-fill me-2" />
                    <small>{selectedRecipe.servings} Servings</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
