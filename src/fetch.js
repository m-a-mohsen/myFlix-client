// this is only a function debug file (not for production)
const uri = 'https://moviesapi2.onrender.com/movies';

async function getData(link) {
  const dataFromBase = await fetch(link);
  const parsedData = await dataFromBase.json();
  const movies = parsedData.map((movie) => ({
    _id: movie._id,
    Title: movie.title,
    Description: movie.fullplot,
    Genre: movie.genres,
    Director: movie.directors,
    ImagePath: movie.poster,
  }));
//   console.log('data:', movies);
}

getData(uri);
