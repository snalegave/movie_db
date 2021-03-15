import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <div className={classes.MovieContainer}>
      <img src={props.data.poster_path ? `https://image.tmdb.org/t/p/w500${props.data.poster_path}` : "/image/noposter.jpg"} alt={props.tmdb_id} width={200} height={300} onClick={props.onClick}/>
    </div>
  )
}

export default Movie;
