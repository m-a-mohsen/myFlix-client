/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useParams } from 'react-router';
// import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export function ProfileView({ user, movies, favoriteMovie }) {
  const favMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );
  return (
    <div>
      <h3>User Details</h3>
      <div>
        <span>
          <strong>User Name: </strong>
        </span>
        <span>{user.Username}</span>
      </div>
      <div>
        <span>
          <strong>Email: </strong>
        </span>
        <span>{user.Email}</span>
      </div>
      <div>
        <span>
          <strong>Birthday: </strong>
        </span>
        <span>{user.Birthday}</span>
      </div>
      <div>
        <h3>Favorite Movies:</h3>
        <Row className="my-2">
          {favMovies.map((movie) => (
            <Col key={movie._id} md={2} className="p-2">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
