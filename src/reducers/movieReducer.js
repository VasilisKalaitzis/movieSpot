import {
  FETCH_MAIN_CONTENT_DATA,
  FETCH_MOVIES_FROM_URL,
  UPDATE_MOVIE_LIST,
  MODIFY_PROPERTY_MOVIE,
  CHANGE_MAIN_CONTENT_VIEW,
  FETCH_MOVIE_DETAILS
} from "../actions/types";

const initialState = {
  mainContent: {},
  cachedMovies: {},
  movieList: [],
  currentPage: 0,
  movieDetails: {},
  movieId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAIN_CONTENT_DATA:
      //get static data for layout
      return {
        ...state,
        mainContent: action.payload.mainContent
      };
    case FETCH_MOVIES_FROM_URL:
      // update the existing cachedMovies
      // by adding a new page object
      return {
        ...state,
        cachedMovies: {
          ...state.cachedMovies,
          [action.payload.page]: {
            movies: action.payload.movies
          }
        }
      };
    case FETCH_MOVIE_DETAILS:
      // update the existing cachedMovies
      // by adding a new page object
      return {
        ...state,
        movieDetails: action.payload.movieDetails
      };
    case UPDATE_MOVIE_LIST:
      // 1) from the requested localPage we find the serverPage
      // 2) we multiply the localPage by 25 to find the first item from the list that we need
      // 3) we multiply the serverPage by 250 to find the start of the page
      // 4) we subtract the start of the page from the first item from the list that we need
      let localPage = action.payload.localPage;
      // 1)
      let serverPage = Math.floor(localPage / 10);
      // 2)
      let startingIndex = localPage * 25;
      // 3)
      let serverPageStart = serverPage * 250;
      // 4)
      let movie_list_start = startingIndex - serverPageStart;
      let movie_list_end = movie_list_start + 25;

      // For insanity reasons
      let cloneCachedMovies = state.cachedMovies[serverPage].movies.slice();
      let newMovieList = cloneCachedMovies.slice(
        movie_list_start,
        movie_list_end
      );
      return {
        ...state,
        movieList: newMovieList
      };
    case MODIFY_PROPERTY_MOVIE:
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    case CHANGE_MAIN_CONTENT_VIEW:
      return {
        ...state,
        mainContent: {
          ...state.mainContent,
          current_view: action.payload.view
        },
        movieId: action.payload.movieId
      };
    default:
      return state;
  }
}
