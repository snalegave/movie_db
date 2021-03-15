import React, { useState, useEffect, useCallback } from 'react';
import classes from "./ServiceContainer.module.css";
import Movie from "../components/Movie";
import { getMovieService } from "../API/serviceAPI";
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'

const ITEMS_PER_PAGE = 21;

const ServiceContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("release date");
  const [desc, setDesc] = useState(true);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  const updateMovies = (data) => {
    setMovies(data);
    setLoading(false);
  }

  const renderMovies = () => {
    if (movies) {
      return (
        movies.map(movie => {
          return <Movie key={movie.tmdb_id} data={movie} />
        })
      )
    }
  }

  const renderArrow = (item) => {
    if (item === order) {
      return desc ? <ArrowDown size={12} /> : <ArrowUp size={12} />
    }
  }

  const onSelect = (selected) => {
    if (selected === order) {
      setDesc(!desc);
    } else {
      setOrder(selected);
      setDesc(true);
    }
  }

  const getMovies = useCallback((service, itemsPerPage, page, desc, order, callback) => {
    getMovieService(service, itemsPerPage, page, desc, order, callback)
  }, [])

  useEffect(() => {
    setLoading(true);
    getMovies(props.service, ITEMS_PER_PAGE, page, desc, order.replace(" ", "_"), updateMovies);
  }, [order, desc, page, props.service, getMovies])

  return (
    <div>
      <div className={classes.Header}>
        <img className={classes.Logo} src={`/image/${props.service}-logo.png`} alt="logo" height={70} />
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Order by: {order}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onSelect("release date")}><div className={classes.DropdownItem}>release date {renderArrow("release date")}</div></Dropdown.Item>
            <Dropdown.Item onClick={() => onSelect("title")}><div className={classes.DropdownItem}>title {renderArrow("title")}</div></Dropdown.Item>
            <Dropdown.Item onClick={() => onSelect("countries")}><div className={classes.DropdownItem}>countries {renderArrow("countries")}</div></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={classes.MovieListContainer}>
      {
        loading ?
        <div className={classes.SpinnerContainer}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div> :
        renderMovies()
      }
      </div>
      {
        !loading ? <div className={classes.Footer}>
          <Button variant="outline-primary" disabled={page === 1} onClick={() => {setPage(page - 1)}}>Prev</Button>
          <Button variant="outline-primary" onClick={() => {setPage(page + 1)}}>Next</Button>
        </div> : null
      }
    </div>
  )
}

export default ServiceContainer;
