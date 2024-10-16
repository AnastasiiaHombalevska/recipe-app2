import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/recipe.scss';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data.meals ? data.meals[0] : null));
  }, [id]);

  const {
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

  return (
    <div className="recipe__details">
      <div className="recipe__details-img-container">
        <img 
          src={strMealThumb}
          className="recipe__details--image"
          alt={strMeal}
        />

      <h2 className="recipe__details-title">{strMeal}</h2>
      <h3 className="recipe__details-category">{strCategory}</h3>
      <h4 className="recipe__details-area">{strArea}</h4>

      <ol className="recipe__details-ingredients">
        {ingredientsList}
      </ol>
      </div>

      <div className="recipe__details__description">
        <h3>Instructions</h3>
        <p className="recipe__details-instructions">{strInstructions}</p>
        {strYoutube && (
          <a
            href={strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="recipe__details-link"
          >
            Watch on YouTube
          </a>
        )}
      </div>

      <a href="/">
        <img src={'../close.png'} alt="Close" className="recipe__details-close-icon" />
      </a>
    </div>
  );
}
