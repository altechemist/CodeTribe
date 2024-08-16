import React from 'react';

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

interface RecipeProps {
  recipe: Recipe;
  editRecipe: (id: number) => void;
}

const ViewRecipe: React.FC<RecipeProps> = ({ recipe, editRecipe }) => {
  return (
    <div
      className="modal fade"
      id="viewRecipe"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="viewRecipeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="viewRecipeLabel">
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
                  src={recipe.image}
                  alt={recipe.name}
                  style={{ width: "500px" }}
                />
              </div>

              {/* Right card */}
              <div className="right-card col p-2">
                <h2 className="card-header px-0 pt-5 pb-3">
                  {recipe.name}
                </h2>

                {/* Recipe description */}
                <p className="card-text pt-2">{recipe.description}</p>

                {/* Icon group */}
                <div className="icon-group pt-4 pb-4">
                  <ul className="d-flex list-unstyled mt-auto justify-content-between p-2 gap-2 border rounded-4">
                    <li className="d-flex align-items-center me-2">
                      <i className="bi bi-clock me-2" />
                      <small>{recipe.total_time}</small>
                    </li>
                    <li className="d-flex align-items-center me-2">
                      <i className="bi bi-fire me-2" />
                      <small>{recipe.calories} Calories</small>
                    </li>
                    <li className="d-flex align-items-center me-2">
                      <i className="bi bi-people-fill me-2" />
                      <small>{recipe.servings} Servings</small>
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
                <ul className="list-group list-group-flush ms-3">
                  {Array.isArray(recipe.ingredients) &&
                  recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
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
                  {Array.isArray(recipe.steps) &&
                  recipe.steps.length > 0 ? (
                    recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
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
                  <small>Prep Time: {recipe.prep_time}</small>
                </li>
                <li className="d-flex align-items-center me-2">
                  <i className="bi bi-clock me-2" />
                  <small>Cook Time: {recipe.cook_time}</small>
                </li>

                <div className="btn-group">
                  {/* Edits Recipe */}
                  <button
                    onClick={() => editRecipe(recipe.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#editRecipe"
                    type="button"
                    className="btn btn-primary me-2 green"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button type="button" className="btn btn-primary me-2 green">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecipe;
