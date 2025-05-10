import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({ type, title, toggleFavorite, favorites }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  
// Add a function to fetch the trailer key for a specific movie
const fetchTrailerKey = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=18bd9655ac7b270dc5863b8b9dc32b07`
  );
  const data = await response.json();
  const trailer = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  return trailer ? trailer.key : null; // If no trailer found, return null
};

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=183928bab7fc630ed0449e4f66ec21bd`
    );
    const data = await response.json();

    if (data && data.results) {
      const moviesWithTrailers = await Promise.all(
        data.results.map(async (movie) => {
          const trailerKey = await fetchTrailerKey(movie.id);
          return { ...movie, trailerKey };
        })
      );

      setMovies(moviesWithTrailers);
      setFilterMovies(moviesWithTrailers);
    }
  };

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredMovies = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(query)
    );
    setFilterMovies(filteredMovies);
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">{title}</h2>

        <div className="align_center movie_list_fs">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search Movies"
            value={searchQuery}
            onChange={handleSearch}
            className="movie_search"
          />

          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[7, 6, 5]}
          />

          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={toggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            trailerKey={movie.trailerKey}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
