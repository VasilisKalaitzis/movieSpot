import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchMovieList,
  changePageMovieList
} from "../../actions/movieActions";

import MovieListItem from "./MovieListItem";
import Pagination from "rc-pagination";
import "../../css/Pagination.css";

class MovieList extends Component {
  componentDidMount() {
    this.fethMovies();
  }

  componentDidUpdate() {}

  fethMovies() {
    //the action checks for cached data before pulling from the server
    this.props.fetchMovieList(this.props.url, this.props.currentPage);
  }
  handlePageChange = page => {
    this.props.changePageMovieList(this.props.url, page - 1);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.movieList.map((movieItem, i) => (
          <MovieListItem
            key={"movieItem_" + i}
            data={movieItem}
            scope="normal"
          />
        ))}
        <Pagination
          onChange={this.handlePageChange}
          current={this.props.currentPage + 1}
          total={41500}
          pageSize={25}
          className={"pagination"}
        />
      </React.Fragment>
    );
  }
}
MovieList.defaultProps = {
  url: "",
  currentPage: 0,
  movieList: [],
  itemPerPage: 25
};

MovieList.propTypes = {
  url: PropTypes.string,
  currentPage: PropTypes.number,
  movieList: PropTypes.array
};

const mapStateToProps = state => ({
  movieList: state.movieReducer.movieList,
  currentPage: state.movieReducer.currentPage
});

export default connect(
  mapStateToProps,
  { fetchMovieList, changePageMovieList }
)(MovieList);
