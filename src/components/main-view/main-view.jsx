/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  // ------- Hooks --------
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://moviesapi2.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromDb = data.map((movie) => ({
          _id: movie._id,
          Title: movie.title,
          Description: movie.fullplot,
          sDescription: movie.plot,
          Genre: movie.genres,
          Director: movie.directors,
          ImagePath: movie.poster,
          Year: movie.year,
          Rating: movie.imdb.rating,
        }));
        setMovies(moviesFromDb);
      });
  }, [token]);

  // User authentication
  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      </Row>
    );
  }
  // select a Movie to display in expanded movie view

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      </Row>
    );
  }
  // check if no movies list
  if (movies.length === 0) {
    // return <div>there are no movies !!</div>;
    return <div>Loading... Please have some patience .</div>;
  }

  // display movie card with all movies
  return (
    <Row className="my-2">
      {/* <div style={{ border: '1px solid orange' }}> */}
      {movies.map((movie) => (
        <Col key={movie._id} md={3} className="p-2">
          <MovieCard
            movie={movie}
            // key={movie._id}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        </Col>
      ))}
      <Button
        variant="primary"
        className="my-3"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </Button>
      {/* </div> */}
    </Row>
  );
};
