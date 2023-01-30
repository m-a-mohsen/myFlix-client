/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function MovieCard({
  movie,
  favoriteMovies,
  addToFavorites,
  removeFromFavorites,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (favoriteMovies && favoriteMovies.includes(movie._id)) {
    setIsFavorite(true);
  }
  const handelAddToFavorites = () => addToFavorites(movie);
  const handelRemoveFromFavorites = () => removeFromFavorites(movie);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Year: {movie.Year}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          IMDB Rating: {movie.Rating}
        </Card.Subtitle>
        <Card.Text>{movie.sDescription}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="mx-1" variant="primary">
            Open
          </Button>
        </Link>
        {!isFavorite && (
          <Button
            onClick={handelAddToFavorites}
            className="mx-1"
            variant="secondary"
          >
            Add to Favorites
          </Button>
        )}
        {isFavorite && (
          <Button
            onClick={handelRemoveFromFavorites}
            className="mx-1"
            variant="warning"
          >
            Remove From Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
  // <div onClick={() => onMovieClick(movie)}>{movie.Title}</div>;
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    sDescription: PropTypes.string,
    Year: PropTypes.number,
    Rating: PropTypes.number,
  }).isRequired,
};

// export default MovieCard;
