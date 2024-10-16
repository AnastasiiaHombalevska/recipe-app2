import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss'
import Recipes from './components/recipes'
import RecipeDetails from './components/RecipeDetails';
import Basket from './components/basket';

function App() {
  return (
    <section>
      <Router>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/" element={<Basket />}/>
        </Routes>
    </Router>
    </section>
  )
}

export default App
