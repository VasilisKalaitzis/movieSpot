import {
  FETCH_MAIN_CONTENT_DATA,
  FETCH_MOVIES_FROM_URL,
  UPDATE_MOVIE_LIST
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
  }
  // ToDo - Catch errors
  // .catch(error => dispatch({
  //   type: FETCH_ERROR,
  //   payload: {
  //     error_caught: "Failed to retrieve movies"
  //   }
  // });
};
