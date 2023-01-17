// TODO Display a user's favorite movies as a list
// TODO Allow a user to update their user information (username, password, email, date of birth)
// TODO Add a “Favorite” button to your MovieCard and/or MovieView components
// TODO Allow a user to remove a movie from their list of favorites
// TODO Allow a user to deregister

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
  // ------- Hooks --------
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, [token]);
  // creating router

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            user ? (
              <Row className="my-2">
                {movies.map((movie) => (
                  <Col key={movie._id} md={3} className="p-2">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
        <Route
          path="login"
          element={
            !user ? (
              <Row className="justify-content-md-center">
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                </Col>
              </Row>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="signup" element={<SignupView />} />
        <Route
          path="/movies/:movieId"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView movies={movies} />
              </Col>
            )
          }
        />
        <Route
          path="/user/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <ProfileView user={user} />
            )
          }
        />
      </Route>
    )
  );

  // Layouts
  function RootLayout() {
    return (
      <>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Outlet />
        {isLoading && user ? (
          <p className="text-center">loading....</p>
        ) : (
          <p> </p>
        )}
      </>
    );
  }
  // Return statement
  return <RouterProvider router={router} />;
};
