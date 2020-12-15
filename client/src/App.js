import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Switch} from 'react-router-dom';

import SavedList from './Movies/SavedList';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    let movie = movieList.filter(movie => movie.id !== id)
    console.log(movie)
  };

  return (
    <div>
      <SavedList list={saved} />

      <Switch>
        <Route path='/movies/:id'>
          <Movie movies={[]} />
        </Route>
        <Route path='/'>
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
