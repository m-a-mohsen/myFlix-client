/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
// done Display a user's favorite movies as a list

// [ ] conditional add to favorites button in card view

// [ ] Allow a user to remove a movie from their list of favorites
// [ ] Add a “Favorite” button to your MovieCard and/or MovieView components

// TODO Allow a user to update their user information (username, password, email, date of birth)
// TODO Allow a user to deregister

// HACK search functionality
// HACK similar movies functionality
// HACK refactor promises into async await
// HACK use material framework

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */

import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateUser } from '../update-user/update-user';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
  // ------- Variables --------
  const storedUser = JSON.parse(localStorage.getItem('user'));
  // const storedFavorites = storedUser.FavoriteMovies;
  const storedToken = localStorage.getItem('token');
  // console.log(storedUser);
  // console.log(storedFavorites);
  // ------- Hooks --------
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };
  // fetch all movies
  useEffect(() => {
    if (!token) return;

    fetch('https://moviesapi2.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}`, mode: 'no-cors' },
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
        // setFavoriteMovies(user.favoriteMovies);
        setLoading(false);
      });
  }, [token]);

  // Pull favorite movies
  useEffect(() => {
    if (!token) return;
    fetch(`https://moviesapi2.onrender.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}`, mode: 'no-cors' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const favs = data.FavoriteMovies;
          // console.log({ data });
          // console.log({ favs });
          // console.log({ favoriteMovies });

          setFavoriteMovies(() => [...favs]);
        } else {
          alert('error');
        }
      });
  }, [token]);

  // console.log({ favoriteMovies });
  //
  // filter movies array for profile page
  function isFav(movieItem) {
    return favoriteMovies.includes(movieItem._id);
  }
  const favMovies = movies.filter((movie) => isFav(movie));
  // Add to favorites movies
  const addToFavorites = (movie) => {
    fetch(
      `https://moviesapi2.onrender.com/users/${user.Username}/${movie._id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          mode: 'no-cors',
        },
      }
    ).then((response) => {
      if (response.ok) {
        setFavoriteMovies([...favoriteMovies, movie._id]);
        alert(`${movie.Title} added to favorite movies`);
        window.location.reload();
      } else {
        alert('adding failed');
      }
    });
  };

  // Remove from favorites movies
  const removeFromFavorites = (movie) => {
    fetch(
      `https://moviesapi2.onrender.com/users/${user.Username}/${movie._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          mode: 'no-cors',
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert(`${movie.Title} is removed favorite movies`);
        window.location.reload();
      } else {
        alert('Removing failed');
      }
    });
  };

  // Deregister user
  // useEffect(() => {
  //   const deregisterUser = () => {
  //     fetch(
  //       `https://moviesapi2.onrender.com/users/${user.Username}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     ).then((response) => {
  //       if (response.ok) {
  //         alert(`${user.Username} was permanently removed`);
  //         window.location.reload();
  //       } else {
  //         alert('Deregistration failed');
  //       }
  //     });
  //   };
  // }, []);

  // Update user details
  // useEffect(() => {
  //   const deregisterUser = () => {
  //          const data = {
  //   Username: username,
  //   Password: password,
  //   Email: email,
  //   Birthday: birthday,
  // };
  //     fetch(
  //       `https://moviesapi2.onrender.com/users/${user.Username}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     ).then((response) => {
  //       if (response.ok) {
  //         alert(`${user.Username} was permanently removed`);
  //         window.location.reload();
  //       } else {
  //         alert('Deregistration  failed');
  //       }
  //     });
  //   };
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            user ? (
              <Row className="my-2">
                {movies.map((movie) => (
                  <Col md={3} className="p-2">
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      favoriteMovies={favoriteMovies}
                      addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorites}
                    />
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
              <>
                <ProfileView user={user} />
                <Row className="my-2">
                  {favMovies.map((movie) => (
                    <Col md={2} className="p-2">
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        favoriteMovies={favoriteMovies}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            )
          }
        />
        <Route
          path="/updateUser/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <UpdateUser
                user={user}
                token={token}
                updateUser={updateUser}
                onLoggedOut={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              />
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
