/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useParams } from 'react-router';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div>
        <span>
          <strong>Title: </strong>
        </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>
          <strong>Genre: </strong>
        </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>
          <strong>Director: </strong>
        </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>
          <strong>Description: </strong>
        </span>
        <span>{movie.Description}</span>
      </div>
      <Link to="/">
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};

// MovieView.propTypes = {
//   movies: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.array,
//     Director: PropTypes.array,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
