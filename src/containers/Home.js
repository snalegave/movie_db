import React, { useState } from "react";
import "./Home.css";
import FormControl from 'react-bootstrap/FormControl'
import classes from './Home.module.css';
import Movie from "../components/Movie";
import { Search } from 'react-bootstrap-icons';
import { getIdByName } from '../API/serviceAPI';
import MovieDetailsModal from '../components/MovieDetailsModal'

const DEFAULT_LIMIT = 20;

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [result, setResult] = useState(null);
  const [input, setInput] = useState("");

  const updateModal = (movieData) => {
    setSelectedMovie(movieData);
    setModalShow(true);
  }

  const onSearch = () => {
    if (input.length > 0) {
      getIdByName(input, DEFAULT_LIMIT, (data) => {
        setResult(data);
      });
    }
  }

  const renderMovies = () => {
    if (result.length === 0) {
      return <h2 className={classes.Error}>No Result Found..</h2>
    }
    return result.map(movie => {
      return <Movie key={movie.tmdb_id} data={movie} onClick={() => updateModal(movie)} />
    })
  }

  return (
    <div className="Home">
      <div className={result === null ? "lander" : classes.Hidden}>
        <h1>Search</h1>
      </div>
      <div className={classes.SearchBar}>
        <FormControl className={classes.Input} value={input} size="lg" type="text" placeholder="Movie Name"
          onChange={(e) => {
            setInput(e.target.value);
          }} />
        <div className={classes.SearchButton} onClick={onSearch}>
          <Search size={28} />
        </div>
      </div>
      {
        result ? <div className={classes.MovieListContainer}>
          {renderMovies()}
        </div> : null
      }
      {
        selectedMovie !== null ? <MovieDetailsModal
          show={modalShow}
          movie={selectedMovie}
          onHide={() => setModalShow(false)}
        /> : null
      }
    </div>
  );
}
