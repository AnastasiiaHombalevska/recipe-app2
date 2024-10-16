import React, { useEffect, useState, useCallback } from "react";
import Recipe from "./recipe";
import Pagination from "./pagination";
import { debounce } from "lodash";
import axios from 'axios';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [perPage] = useState(4);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  

  const totalPages = Math.ceil(filteredRecipes.length / perPage);
  const lastIndexItem = currentPageNumber * perPage;
  const firstIndexItem = lastIndexItem - perPage;
  const currentPage = filteredRecipes.slice(firstIndexItem, lastIndexItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const meals = response.data.meals || [];
        setRecipes(meals);
        setFilteredRecipes(meals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [query]);

  function normalize(word) {
    return word.toLowerCase().trim();
  }

  const filterRecipes = useCallback(
    debounce((input) => {
      if (input) {
        const newFilteredRecipes = recipes.filter(recipe => 
          normalize(recipe.strCategory).includes(normalize(input))
        );
        setFilteredRecipes(newFilteredRecipes);
      } else {
        setFilteredRecipes(recipes);
      }
      setCurrentPageNumber(1);
    }, 300),
    [recipes]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    filterRecipes(inputValue);
  };

  const handleClick = () => {
    setFavorites(prevList => prevList.fillter(fav => fav.newItem))
  }

  return (
    <section className="recipes">
      <div className="recipes__top-container">
        <input
          type="text"
          value={query}
          className="recipes__filter"
          placeholder="Enter category..."
          onChange={handleChange}
        />
        
        <a href="#favorite" className="recipes__favorite">Favorite recipes</a>
      </div>


      <div className="recipes__container">
        {currentPage.map(recipe => (
          <Recipe recipe={recipe} key={recipe.idMeal} />
        ))}
      </div>

      <Pagination
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
