import React, { useState } from "react";
import "./Home.css";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import classes from './Home.module.css';
import Movie from "../components/Movie";
import { Search } from 'react-bootstrap-icons';
import { getIdByName } from '../API/serviceAPI';

const DEFAULT_LIMIT = 20;

export default function Home() {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState("");

  const onSearch = () => {
    if (input.length > 0) {
      getIdByName(input, DEFAULT_LIMIT, (data) => {
        setResult(data);
      });
    }
  }

  const renderMovies = () => {
    return result.map(movie => {
      return <Movie key={movie.tmdb_id} data={movie} />
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
    </div>
  );
}
