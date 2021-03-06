import {
  FETCH_MAIN_CONTENT_DATA,
  FETCH_MOVIES_FROM_URL,
  UPDATE_MOVIE_LIST,
  MODIFY_PROPERTY_MOVIE,
  CHANGE_MAIN_CONTENT_VIEW,
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_LIST_FROM_SEARCH,
  ADD_MOVIE_TO_LIST
} from "./types";

import mainContent from "../static_data/mainContent";

export const fetchMainContentData = () => dispatch => {
  dispatch({
    type: FETCH_MAIN_CONTENT_DATA,
    payload: {
      mainContent: mainContent
    }
  });
};

export const fetchMovieList = (url, localPage) => (dispatch, getState) => {
  let cachedMovies = getState().movieReducer.cachedMovies;
  let serverPage = Math.floor(localPage / 10);
  //pull from server only if the client doesn't have it
  if (cachedMovies[serverPage] === undefined) {
    fetch(url + "?page=" + serverPage)
      .then(response => response.json())
      .then(
        data => (
          dispatch({
            type: FETCH_MOVIES_FROM_URL,
            payload: {
              page: serverPage,
              movies: data
            }
          }),
          dispatch({
            type: UPDATE_MOVIE_LIST,
            payload: {
              localPage: localPage
            }
          })
        )
      );
  } else {
    dispatch({
      type: UPDATE_MOVIE_LIST,
      payload: {
        localPage: localPage
      }
    });
  }
  // ToDo - Catch errors
  // .catch(error => dispatch({
  //   type: FETCH_ERROR,
  //   payload: {
  //     error_caught: "Failed to retrieve movies"
  //   }
  // });
};

export const fetchMovieListFromSearch = (url, query) => dispatch => {
  fetch(url + "?q=" + query)
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: FETCH_MOVIE_LIST_FROM_SEARCH,
        payload: {
          movieList: data
        }
      })
    );
};

export const fetchMovieDetails = (url, movieId) => dispatch => {
  // ToDo: we already have this data on the client
  // I need to redesign the data structure
  fetch(url + "/" + movieId + "?embed[]=cast")
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: FETCH_MOVIE_DETAILS,
        payload: {
          movieDetails: data
        }
      })
    );
};

export const modifyPropertyMovie = (property, value) => dispatch => {
  dispatch({
    type: MODIFY_PROPERTY_MOVIE,
    payload: {
      property: property,
      value: value
    }
  });
};

export const changePageMovieList = (url, newPage) => dispatch => {
  dispatch(modifyPropertyMovie("currentPage", newPage));
  dispatch(fetchMovieList(url, newPage));
};

export const changeMainContentView = (view, value) => dispatch => {
  switch (view) {
    case "movieList":
      dispatch({
        type: CHANGE_MAIN_CONTENT_VIEW,
        payload: {
          view: view,
          currentPage: value
        }
      });

      break;
    case "movieDetails":
      dispatch({
        type: CHANGE_MAIN_CONTENT_VIEW,
        payload: {
          view: view,
          movieId: value
        }
      });

      break;
    default: {
      break;
    }
  }
};

export const addMovieToList = (listName, movieItem) => dispatch => {
  dispatch({
    type: ADD_MOVIE_TO_LIST,
    payload: {
      movieItem: movieItem,
      listName: listName
    }
  });
};
