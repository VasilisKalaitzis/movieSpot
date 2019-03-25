import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMovieList } from "../../actions/movieActions";

import MovieListItem from "./MovieListItem";
import Pagination from "./Pagination";

import "../../css/Pagination.css";

class MovieList extends Component {
  componentDidMount() {
    this.fethMovies();
  }

  fethMovies() {
    //the action checks for cached data before pulling from the server
    this.props.fetchMovieList(this.props.url, this.props.page);
  }
  handlePageChange() {
    debugger;
  }

  render() {
    // const styles = {};
    debugger;
    return (
      <div className="container">
        {this.props.movieList.map((movieItem, i) => (
          <MovieListItem key={"movieItem_" + i} data={movieItem} />
        ))}
        <Pagination
          activePage={this.props.page}
          itemsCountPerPage={this.props.itemPerPage}
          totalItemsCount={1000}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}
MovieList.defaultProps = {
  url: "",
  page: 0,
  movieList: [],
  itemPerPage: 25
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
