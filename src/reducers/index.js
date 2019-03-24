import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import movieReducer from "./movieReducer";

export default combineReducers({
  layoutReducer: layoutReducer,
  movieReducer: movieReducer
});
