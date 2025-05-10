import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './component/Navbar/Navbar';
import MovieList from './component/MovieList/MovieList';
import FavoritesPage from './component/FavoritesPage/FavoritesPage'; 
import Login from './component/Login/Login'; 

function App() {
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  // If not logged in, show login page only
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar favoritesCount={favorites.length} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MovieList type="popular" title="Popular" toggleFavorite={toggleFavorite} favorites={favorites} />
                <MovieList type="top_rated" title="Top Rated" toggleFavorite={toggleFavorite} favorites={favorites} />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
