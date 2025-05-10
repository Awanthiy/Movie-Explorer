import React from 'react';
import './MovieCards.css';
import Star from '../../assets/star.png';
import FavouriteIcon from '@mui/icons-material/Favorite';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MovieCard = ({ movie, onFavoriteClick, isFavorite, trailerKey }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick(movie);
  };

  const handleYouTubeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    }
  };

  return (
    <a
      href={`https://www.themoviedb.org/movie/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="movie_card"
    >
      {/* Icons Row (Top-Right) */}
      <div className="icon-row">
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <FavouriteIcon
            style={{
              color: isFavorite ? 'yellow' : 'white',
              fontSize: '20px',
            }}
          />
        </div>
        <div className="youtube-icon" onClick={handleYouTubeClick}>
          <YouTubeIcon
            style={{
              color: 'red',
              fontSize: '20px',
            }}
          />
        </div>
      </div>

      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="movie poster"
        className="movie_poster"
      />

      {/* Movie Details */}
      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.original_title}</h3>
        <div className="align_center movie_date_rate">
          <p>{movie.release_date}</p>
          <p>
            {movie.vote_average}
            <img src={Star} alt="rating icon" className="card_emoji" />
          </p>
        </div>
        <p className="movie_description">
          {movie.overview?.slice(0, 100) + '...'}
        </p>
      </div>
    </a>
  );
};

export default MovieCard;
