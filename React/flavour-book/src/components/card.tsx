import React from 'react';

interface Recipe {
  id: number;
  image: string;
  title: string;
  name: string;
  description: string;
  total_time: string;
  calories: number;
  servings: number;
}

interface CardProps {
  recipe: Recipe;
  selectRecipe: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ recipe, selectRecipe }) => {
  return (
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
              <li className="d-flex align-items-center me-1">
                <i className="bi bi-clock me-2" />
                <small>{recipe.total_time}</small>
              </li>
              <li className="d-flex align-items-center me-2 ms-1">
                <i className="bi bi-fire me-2" />
                <small>{recipe.calories}</small>
              </li>
              <li className="d-flex align-items-center me-2 ms-1">
                <i className="bi bi-people-fill me-2" />
                <small>{recipe.servings}</small>
              </li>
              <li className="d-flex align-items-center me-2 ms-2">
                <i className="bi bi-bookmark-heart-fill me-2" />
              </li>
              <div className="ms-5">
                <button
                  onClick={() => selectRecipe(recipe.id)}
                  data-bs-toggle="modal"
                  data-bs-target="#viewRecipe"
                  className="btn btn-outline-primary green rounded-pill px-3 ms-4 green"
                >
                  View
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
