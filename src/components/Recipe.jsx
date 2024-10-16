import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/recipe.scss';

export default function Recipe({ recipe }) {
  if (!recipe) {
    return null;
  }

  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strMealThumb,
    strInstructions,
    strYoutube
  } = recipe;

  const ingredientsList = Object.keys(recipe)
    .filter(key => key.startsWith('strIngredient') && recipe[key])
    .map((key, index) => (
      <li key={index + 1}>
        {recipe[key]} - <span>{recipe[`strMeasure${index + 1}`]}</span>
      </li>
    ));

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <div className="recipe__card" onClick={handleClick}>
      <div>
        <img 
          src={strMealThumb}
          className="recipe__card-image"
          alt={strMeal}
        />
      </div>

      <div>
        <h2>{strMeal}</h2>
        <h3>{strCategory}</h3>
        <h4>{strArea}</h4>
        
        <ol>
          {ingredientsList}
        </ol>

        <div>
          <h3>Instructions</h3>
          <p>{strInstructions}</p>
          {strYoutube && (
            <a
              href={strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="recipe__card-link"
            >
              Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
