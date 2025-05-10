import React from 'react';
import MovieCard from '../MovieList/MovieCard'; 
import "./FavoritesPage.css";// Import MovieCard to reuse it for favorites display

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="no-favorites">
        <h2>No favorite movies yet!</h2>
      </div>
    );
  }

  return (
    <section className="favorites_page">
      <header className="favorites_header">
        <h2>Your Favorite Movies</h2>
      </header>
      
      <div className="movie_cards">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={toggleFavorite} // Pass toggleFavorite to remove favorites
            isFavorite={true} // Always true because it's in the favorites
          />
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;
