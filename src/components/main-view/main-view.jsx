// import React from 'react';
import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: 1,
      Title: 'Mean Girls',
      Description:
        'Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.',
      Genre: 'Comedy',
      Director: 'Mark Waters',
      ImagePath:
        'https://m.media-amazon.com/images/M/MV5BMjE1MDQ4MjI1OV5BMl5BanBnXkFtZTcwNzcwODAzMw@@._V1_UY268_CR3,0,182,268_AL__QL50.jpg'
    },
    {
      _id: 2,
      Title: 'Gretel & Hansel',
      Description:
        'A long time ago in a distant fairy tale countryside, a young girl leads her little brother into a dark wood in desperate search of food and work, only to stumble upon a nexus of terrifying evil.',
      Genre: 'Thriller',
      Director: 'Oz Perkins',
      ImagePath:
        'https://m.media-amazon.com/images/M/MV5BOTIyYWJjZDctODY4OC00NWExLWE2NTktZmY0MWY2YWZjMWIxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL__QL50.jpg'
    },
    {
      _id: 3,
      Title: 'The Avengers',
      Description:
        "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      Genre: 'Thriller',
      Director: 'Woody Allen',
      ImagePath:
        'https://m.media-amazon.com/images/M/MV5BODAwZDlhZjUtYzM2MS00MGVmLWFjNWMtODc5NjM2OTNkNjExXkEyXkFqcGdeQXVyMzIzNDU1NTY@._V1_UX182_CR0,0,182,268_AL__QL50.jpg'
    }
  ]);

  // select a book to display in expanded movie view
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  // check if no movies list
  if (movies.length === 0) {
    return <div>there are no movies !!</div>;
  }

  // display movie card with all movies
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie._id}
          onMovieClick={(newSlectedMovie) =>
            setSelectedMovie(newSlectedMovie)
          }
        />
      ))}
      {/* {movies.map((movie) => (
        <MovieView movie={movie} key={movie._id}/>
      ))} */}
    </div>
  );
};
