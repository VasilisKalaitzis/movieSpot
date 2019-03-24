import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMovieList } from "../../actions/movieActions";

import MovieListItem from "./MovieListItem";

class MovieList extends Component {
  componentDidMount() {
    this.fethMovies();
  }

  fethMovies() {
    //the action checks for cached data before pulling from the server
    this.props.fetchMovieList(this.props.url, this.props.page);
  }

  render() {
    // const styles = {};
    return (
      <div className="container">
        {this.props.movieList.map((movieItem, i) => (
          <MovieListItem key={"movieItem_" + i} data={movieItem} />
        ))}
      </div>
    );
  }
}
MovieList.defaultProps = {
  url: "",
  page: 0,
  movieList: []
};

MovieList.propTypes = {
  url: PropTypes.string,
  page: PropTypes.number,
  movieList: PropTypes.array
};

const mapStateToProps = state => ({
  movieList: state.movieReducer.movieList
});

export default connect(
  mapStateToProps,
  { fetchMovieList }
)(MovieList);
