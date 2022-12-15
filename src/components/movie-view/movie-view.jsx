export const MovieView = ({ movie, onBackClick }) => {
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
