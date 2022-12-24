/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';

export function MovieCard({ movie, onMovieClick }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      {/* <Card.Img variant="top" src="https://via.placeholder.com/150" /> */}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Year: {movie.Year}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          IMDB Rating: {movie.Rating}
        </Card.Subtitle>
        <Card.Text>{movie.sDescription}</Card.Text>
        <Button
          className="mt-auto"
          variant="primary"
          onClick={() => onMovieClick(movie)}
        >
          open
        </Button>
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
  onMovieClick: PropTypes.func.isRequired,
};

// export default MovieCard;
