import React, { createContext, useReducer } from 'react';

import appReducer from './reducer';
import { END_POINT, API_KEY } from "../const"

const initialState = {
  movieList: [],
  detailList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function updateMovies(movies) {
    dispatch({
      type: "UPDATE_MOVIE_LIST",
      payload: movies
    });
  }

  function addDetail(detail) {
    dispatch({
      type: "ADD_MOVIE_DETAIL",
      payload: detail
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        movieList: state.movieList,
        detailList: state.detailList,
        updateMovies,
        addDetail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};